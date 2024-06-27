import { Router } from 'express';
import validateRequest from "../../Middlewares/validateRequest";
import { RoomControllers } from "./room.controller";
import { RoomValidations } from "./room.validation";


const router = Router();

router.post(
    '/',
    validateRequest(RoomValidations.roomValidationSchema),
    RoomControllers.createRoom,
);

router.get('/:id', RoomControllers.getSingleRoom);

export const roomRoute = router;