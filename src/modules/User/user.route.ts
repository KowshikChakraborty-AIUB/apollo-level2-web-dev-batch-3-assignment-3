import { Router } from 'express';
import { UserControllers } from './user.controller';

const router = Router();

router.post(
    '/signup',
    UserControllers.registerUser,
);

export const userRoute = router;