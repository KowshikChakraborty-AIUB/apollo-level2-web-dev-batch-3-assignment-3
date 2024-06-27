"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomRoute = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../Middlewares/validateRequest"));
const room_controller_1 = require("./room.controller");
const room_validation_1 = require("./room.validation");
const router = (0, express_1.Router)();
router.post('/', (0, validateRequest_1.default)(room_validation_1.RoomValidations.roomValidationSchema), room_controller_1.RoomControllers.createRoom);
router.get('/:id', room_controller_1.RoomControllers.getSingleRoom);
router.get('/', room_controller_1.RoomControllers.getAllRoom);
exports.roomRoute = router;
