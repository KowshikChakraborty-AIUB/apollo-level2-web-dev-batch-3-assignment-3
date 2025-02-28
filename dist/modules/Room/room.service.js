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
exports.RoomServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const room_model_1 = require("./room.model");
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const createRoomIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const roomData = yield room_model_1.Room.find({ roomNo: payload.roomNo });
    if (roomData[0]) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Room already exist');
    }
    const result = room_model_1.Room.create(payload);
    return result;
});
const getSingleRoomFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.findById(id);
    return result;
});
const getAllRoomFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.find({ isDeleted: false });
    return result;
});
const updateRoomIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const roomData = yield room_model_1.Room.findById(id);
    if (!roomData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room does not exist');
    }
    if ((roomData === null || roomData === void 0 ? void 0 : roomData.isDeleted) === true) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room deleted');
    }
    const result = yield room_model_1.Room.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteRoomFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const roomData = yield room_model_1.Room.findById(id);
    if (!roomData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room does not exist');
    }
    if ((roomData === null || roomData === void 0 ? void 0 : roomData.isDeleted) === true) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room already deleted');
    }
    const result = yield room_model_1.Room.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
exports.RoomServices = {
    createRoomIntoDB,
    getSingleRoomFromDB,
    getAllRoomFromDB,
    updateRoomIntoDB,
    deleteRoomFromDB
};
