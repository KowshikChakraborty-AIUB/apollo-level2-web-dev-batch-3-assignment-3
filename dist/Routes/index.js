"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/User/user.route");
const room_route_1 = require("../modules/Room/room.route");
const slot_route_1 = require("../modules/Slot/slot.route");
const booking_route_1 = require("../modules/Booking/booking.route");
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
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
