import { z } from 'zod';
// import { Types } from 'mongoose';
import { dateSchema } from '../Booking/booking.constant';

// // Define the schema for Room object reference ID
// const roomObjectIdSchema = z.custom<Types.ObjectId>(
//   (value) => Types.ObjectId.isValid(value),
//   {
//     message: 'Invalid Room ObjectId',
//   }
// );


const createSlotValidationSchema = z.object({
  room: z.string().nullish(),
  date: dateSchema.nullish(),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format, should be HH:mm").nullish(), // HH:mm format
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format, should be HH:mm").nullish(), // HH:mm format
});

export default createSlotValidationSchema;
