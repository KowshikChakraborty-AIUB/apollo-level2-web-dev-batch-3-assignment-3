import { z } from 'zod';
import { dateSchema } from './booking.constant';

const createBookingValidationSchema = z.object({
    body: z.object({
        room: z.string(),
        date: dateSchema,
        slots: z.array(z.string()),
        user: z.string(),
    }),
});

const updateBookingValidationSchema = z.object({
    isConfirmed: z.enum(['unconfirmed', 'confirmed', 'canceled']),
});

export const BookingValidations = {
    createBookingValidationSchema,
    updateBookingValidationSchema
};