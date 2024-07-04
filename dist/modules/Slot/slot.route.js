"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotRoute = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../Middlewares/validateRequest"));
const slot_validation_1 = __importDefault(require("./slot.validation"));
const slot_controller_1 = require("./slot.controller");
const user_constant_1 = require("../User/user.constant");
const auth_1 = __importDefault(require("../../Middlewares/auth"));
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(slot_validation_1.default), slot_controller_1.SlotControllers.createSlots);
router.get('/availability', slot_controller_1.SlotControllers.getAllSlots);
exports.slotRoute = router;
