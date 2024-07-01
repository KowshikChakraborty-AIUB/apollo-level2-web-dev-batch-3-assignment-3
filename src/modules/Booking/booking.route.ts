import { Router } from 'express';
import validateRequest from '../../Middlewares/validateRequest';
import createBookingValidationSchema from './booking.validation';
import { BookingControllers } from './booking.controller';

const router = Router();

router.post(
    '/',
    validateRequest(createBookingValidationSchema),
    BookingControllers.createBooking,
);

export const bookingRoute = router;