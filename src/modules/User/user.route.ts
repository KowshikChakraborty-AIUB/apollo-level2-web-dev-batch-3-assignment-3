import { Router } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../Middlewares/validateRequest';
import userValidationSchema from './user.validaton';
import loginValidationSchema from '../Auth/auth.validation';
import { AuthControllers } from '../Auth/auth.controller';

const router = Router();

router.post(
    '/signup',
    validateRequest(userValidationSchema),
    UserControllers.registerUser,
);

router.post(
    '/login',
    validateRequest(loginValidationSchema),
    AuthControllers.loginUser,
);


export const userRoute = router;