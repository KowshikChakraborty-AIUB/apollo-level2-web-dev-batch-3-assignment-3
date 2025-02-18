import { Router } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../Middlewares/validateRequest';
import loginValidationSchema from '../Auth/auth.validation';
import { AuthControllers } from '../Auth/auth.controller';
import { updateUserValidationSchema, userValidationSchema } from './user.validaton';
import auth from '../../Middlewares/auth';
import { USER_ROLE } from './user.constant';

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

router.get('/userInfoByEmail/:email', UserControllers.getUserByEmailId);

router.put('/updateUserProfile/:email',
    auth(USER_ROLE.user, USER_ROLE.admin),
    validateRequest(updateUserValidationSchema),
    UserControllers.updateUserByEmailId,
);

router.put("/deleteUser/:userId",
    auth(USER_ROLE.user, USER_ROLE.admin),
    UserControllers.deleteUser
);

export const userRoute = router;