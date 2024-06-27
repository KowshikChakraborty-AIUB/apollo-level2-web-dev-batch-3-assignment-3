import { Router } from 'express';
import { userRoute } from '../modules/User/user.route';
import { roomRoute } from '../modules/Room/room.route';


const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: userRoute,
    },
    {
        path: '/rooms',
        route: roomRoute,
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;