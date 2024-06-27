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
exports.RoomControllers = void 0;
const catchAsync_1 = __importDefault(require("../../Utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../Utils/sendResponse"));
const room_error_1 = __importDefault(require("./room.error"));
const room_service_1 = require("./room.service");
const createRoom = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_service_1.RoomServices.createRoomIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Room added successfully',
        data: result,
    });
}));
const getSingleRoom = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield room_service_1.RoomServices.getSingleRoomFromDB(id);
    if (!result) {
        (0, sendResponse_1.default)(res, (0, room_error_1.default)('No Data Found'));
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Rooms retrieved successfully',
        data: result,
    });
}));
exports.RoomControllers = {
    createRoom,
    getSingleRoom,
};
