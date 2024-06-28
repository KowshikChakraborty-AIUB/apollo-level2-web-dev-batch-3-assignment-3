import { Router } from 'express';
import validateRequest from '../../Middlewares/validateRequest';
import createSlotValidationSchema from './slot.validation';
import { SlotControllers } from './slot.controller';

const router = Router();

router.post(
    '/',
    validateRequest(createSlotValidationSchema),
    SlotControllers.createSlots,
);

export const slotRoute = router;