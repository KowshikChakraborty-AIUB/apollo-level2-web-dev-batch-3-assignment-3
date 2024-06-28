"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const room_model_1 = require("../Room/room.model");
const slot_constant_1 = require("./slot.constant");
const slot_model_1 = require("./slot.model");
const createSlotsIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { room, date, startTime, endTime } = payload;
    const roomData = yield room_model_1.Room.findById(room);
    if (!roomData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room does not exist');
    }
    if ((roomData === null || roomData === void 0 ? void 0 : roomData.isDeleted) === true) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room deleted');
    }
    const convertStartTimeToMinutes = (0, slot_constant_1.convertToMinutes)(startTime);
    const convertEndTimeToMinutes = (0, slot_constant_1.convertToMinutes)(endTime);
    const totalDuration = convertEndTimeToMinutes - convertStartTimeToMinutes;
    const slotDuration = 60;
    const numberOfSlots = totalDuration / slotDuration;
    if (convertStartTimeToMinutes > convertEndTimeToMinutes) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Start time: ${startTime} should be before End Time: ${endTime}`);
    }
    const slotDataFromDBByRoomId = yield slot_model_1.Slot.find({ room });
    const slotDBStartTimeToMinutes = slotDataFromDBByRoomId === null || slotDataFromDBByRoomId === void 0 ? void 0 : slotDataFromDBByRoomId.map(data => (0, slot_constant_1.convertToMinutes)(data.startTime));
    const slotDBEndTimeToMinutes = slotDataFromDBByRoomId === null || slotDataFromDBByRoomId === void 0 ? void 0 : slotDataFromDBByRoomId.map(data => (0, slot_constant_1.convertToMinutes)(data.endTime));
    let startAndEndTimeRanges = [];
    for (let i = 0; i < slotDBStartTimeToMinutes.length; i++) {
        startAndEndTimeRanges = startAndEndTimeRanges.concat((0, slot_constant_1.getRange)(slotDBStartTimeToMinutes[i], slotDBEndTimeToMinutes[i]));
    }
    const slots = [];
    for (let i = 0; i < numberOfSlots; i++) {
        const startTimeToMinutes = convertStartTimeToMinutes + i * slotDuration;
        const endTimeToMinutes = startTimeToMinutes + slotDuration;
        const DBStartTimeToMinutes = startAndEndTimeRanges === null || startAndEndTimeRanges === void 0 ? void 0 : startAndEndTimeRanges.filter(data => data === startTimeToMinutes)[0];
        const DBEndTimeToMinutes = startAndEndTimeRanges === null || startAndEndTimeRanges === void 0 ? void 0 : startAndEndTimeRanges.filter(data => data === endTimeToMinutes)[0];
        //console.log(startTimeToMinutes, endTimeToMinutes);
        //console.log(DBStartTimeToMinutes, DBEndTimeToMinutes)
        if (startTimeToMinutes < DBEndTimeToMinutes && endTimeToMinutes > DBStartTimeToMinutes) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Slot conflict found for time range ${(0, slot_constant_1.convertBackToDesiredTime)(startTimeToMinutes)} - ${(0, slot_constant_1.convertBackToDesiredTime)(endTimeToMinutes)}`);
        }
        const startTime = (0, slot_constant_1.convertBackToDesiredTime)(startTimeToMinutes);
        const endTime = (0, slot_constant_1.convertBackToDesiredTime)(endTimeToMinutes);
        const slot = yield slot_model_1.Slot.create({
            room,
            date,
            startTime: startTime,
            endTime: endTime,
            isBooked: false,
        });
        slots.push(slot);
    }
    return slots;
});
const getAllSlotsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, roomId } = query;
    const roomData = yield room_model_1.Room.findById(roomId);
    if ((roomData === null || roomData === void 0 ? void 0 : roomData.isDeleted) === true) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room deleted');
    }
    const result = yield slot_model_1.Slot.find({ room: roomId, date: date }).populate('room');
    return result;
});
exports.SlotServices = {
    createSlotsIntoDB,
    getAllSlotsFromDB,
};
