import { Router } from 'express';
import validateRequest from '../../Middlewares/validateRequest';
import createBookingValidationSchema from './booking.validation';
import { BookingControllers } from './booking.controller';
import auth from '../../Middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = Router();

router.post(
    '/',
    auth(USER_ROLE.user),
    validateRequest(createBookingValidationSchema),
    BookingControllers.createBooking,
);

router.get('/', BookingControllers.getAllBookings);

router.put('/:id', BookingControllers.updateBooking);

router.delete('/:id', BookingControllers.deleteBooking);

export const bookingRoute = router;