"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoute = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../Middlewares/validateRequest"));
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../Middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const booking_validation_1 = require("./booking.validation");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(booking_validation_1.BookingValidations.createBookingValidationSchema), booking_controller_1.BookingControllers.createBooking);
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), booking_controller_1.BookingControllers.getAllBookings);
router.put('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(booking_validation_1.BookingValidations.updateBookingValidationSchema), booking_controller_1.BookingControllers.updateBooking);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), booking_controller_1.BookingControllers.deleteBooking);
exports.bookingRoute = router;
