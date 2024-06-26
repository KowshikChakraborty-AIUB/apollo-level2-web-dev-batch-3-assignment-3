"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const booking_constant_1 = require("../Booking/booking.constant");
// Define the schema for Room object reference ID
const roomObjectIdSchema = zod_1.z.custom((value) => mongoose_1.Types.ObjectId.isValid(value), {
    message: 'Invalid Room ObjectId',
});
const createSlotValidationSchema = zod_1.z.object({
    room: roomObjectIdSchema,
    date: booking_constant_1.dateSchema,
    startTime: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format, should be HH:mm"), // HH:mm format
    endTime: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format, should be HH:mm"), // HH:mm format
    isBooked: zod_1.z.boolean(),
});
exports.default = createSlotValidationSchema;
