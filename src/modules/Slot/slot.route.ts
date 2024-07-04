import { Router } from 'express';
import validateRequest from '../../Middlewares/validateRequest';
import createSlotValidationSchema from './slot.validation';
import { SlotControllers } from './slot.controller';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../Middlewares/auth';

const router = Router();

router.post(
    '/',
    auth(USER_ROLE.admin),
    validateRequest(createSlotValidationSchema),
    SlotControllers.createSlots,
);

router.get('/availability', SlotControllers.getAllSlots);

export const slotRoute = router;