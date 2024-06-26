import { z } from 'zod';
import { Types } from 'mongoose';
import { dateSchema } from '../Booking/booking.constant';

// Define the schema for Room object reference ID
const roomObjectIdSchema = z.custom<Types.ObjectId>(
  (value) => Types.ObjectId.isValid(value),
  {
    message: 'Invalid Room ObjectId',
  }
);


const createSlotValidationSchema = z.object({
  room: roomObjectIdSchema,
  date: dateSchema,
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format, should be HH:mm"), // HH:mm format
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format, should be HH:mm"), // HH:mm format
  isBooked: z.boolean(),
});

export default createSlotValidationSchema;
