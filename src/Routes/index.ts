import { Router } from 'express';
import { userRoute } from '../modules/User/user.route';
import { roomRoute } from '../modules/Room/room.route';
import { slotRoute } from '../modules/Slot/slot.route';
import { bookingRoute } from '../modules/Booking/booking.route';
import { BookingControllers } from '../modules/Booking/booking.controller';
import auth from '../Middlewares/auth';
import { USER_ROLE } from '../modules/User/user.constant';


const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: userRoute,
    },
    {
        path: '/rooms',
        route: roomRoute,
    },
    {
        path: '/slots',
        route: slotRoute,
    },
    {
        path: '/bookings',
        route: bookingRoute,
    }
];

router.get('/my-bookings', auth(USER_ROLE.user), BookingControllers.getSpecificUserBookings);

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;