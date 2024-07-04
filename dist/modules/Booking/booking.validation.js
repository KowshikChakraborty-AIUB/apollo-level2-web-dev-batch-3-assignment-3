"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidations = void 0;
const zod_1 = require("zod");
const booking_constant_1 = require("./booking.constant");
const createBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        room: zod_1.z.string(),
        date: booking_constant_1.dateSchema,
        slots: zod_1.z.array(zod_1.z.string()),
        user: zod_1.z.string(),
    }),
});
const updateBookingValidationSchema = zod_1.z.object({
    isConfirmed: zod_1.z.enum(['unconfirmed', 'confirmed', 'canceled']).optional(),
});
exports.BookingValidations = {
    createBookingValidationSchema,
    updateBookingValidationSchema
};
