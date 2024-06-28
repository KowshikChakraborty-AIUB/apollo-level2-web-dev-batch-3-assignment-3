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
const router = (0, express_1.Router)();
router.post('/', (0, validateRequest_1.default)(slot_validation_1.default), slot_controller_1.SlotControllers.createSlots);
exports.slotRoute = router;
