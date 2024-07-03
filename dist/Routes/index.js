"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/User/user.route");
const room_route_1 = require("../modules/Room/room.route");
const slot_route_1 = require("../modules/Slot/slot.route");
const booking_route_1 = require("../modules/Booking/booking.route");
const booking_controller_1 = require("../modules/Booking/booking.controller");
const auth_1 = __importDefault(require("../Middlewares/auth"));
const user_constant_1 = require("../modules/User/user.constant");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: user_route_1.userRoute,
    },
    {
        path: '/rooms',
        route: room_route_1.roomRoute,
    },
    {
        path: '/slots',
        route: slot_route_1.slotRoute,
    },
    {
        path: '/bookings',
        route: booking_route_1.bookingRoute,
    }
];
router.get('/my-bookings', (0, auth_1.default)(user_constant_1.USER_ROLE.user), booking_controller_1.BookingControllers.getSpecificUserBookings);
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
