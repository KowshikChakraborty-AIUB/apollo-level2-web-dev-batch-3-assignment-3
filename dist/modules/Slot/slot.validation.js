"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// import { Types } from 'mongoose';
const booking_constant_1 = require("../Booking/booking.constant");
// // Define the schema for Room object reference ID
// const roomObjectIdSchema = z.custom<Types.ObjectId>(
//   (value) => Types.ObjectId.isValid(value),
//   {
//     message: 'Invalid Room ObjectId',
//   }
// );
const createSlotValidationSchema = zod_1.z.object({
    room: zod_1.z.string().nullish(),
    date: booking_constant_1.dateSchema.nullish(),
    startTime: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format, should be HH:mm").nullish(), // HH:mm format
    endTime: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format, should be HH:mm").nullish(), // HH:mm format
});
exports.default = createSlotValidationSchema;
