import { Router } from 'express';
import validateRequest from '../../Middlewares/validateRequest';
import { BookingControllers } from './booking.controller';
import auth from '../../Middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { BookingValidations } from './booking.validation';

const router = Router();

router.post(
    '/',
    auth(USER_ROLE.user),
    validateRequest(BookingValidations.createBookingValidationSchema),
    BookingControllers.createBooking,
);

router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllBookings);

router.put('/:id', auth(USER_ROLE.admin), validateRequest(BookingValidations.updateBookingValidationSchema), BookingControllers.updateBooking);

router.delete('/:id', auth(USER_ROLE.admin), BookingControllers.deleteBooking);

export const bookingRoute = router;