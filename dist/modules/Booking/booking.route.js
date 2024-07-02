"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoute = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../Middlewares/validateRequest"));
const booking_validation_1 = __importDefault(require("./booking.validation"));
const booking_controller_1 = require("./booking.controller");
const router = (0, express_1.Router)();
router.post('/', (0, validateRequest_1.default)(booking_validation_1.default), booking_controller_1.BookingControllers.createBooking);
router.get('/', booking_controller_1.BookingControllers.getAllBookings);
router.put('/:id', booking_controller_1.BookingControllers.updateBooking);
router.delete('/:id', booking_controller_1.BookingControllers.deleteBooking);
exports.bookingRoute = router;
