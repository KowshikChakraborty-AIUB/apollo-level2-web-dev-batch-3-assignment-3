import { Router } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../Middlewares/validateRequest';
import userValidationSchema from './user.validaton';

const router = Router();

router.post(
    '/signup',
    validateRequest(userValidationSchema),
    UserControllers.registerUser,
);

export const userRoute = router;