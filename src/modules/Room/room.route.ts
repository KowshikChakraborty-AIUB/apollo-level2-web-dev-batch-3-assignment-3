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

router.get('/', RoomControllers.getAllRoom);

router.put(
    '/:id',
    validateRequest(RoomValidations.updateRoomValidationSchema),
    RoomControllers.updateRoom,
);

router.delete('/:id', RoomControllers.deleteRoom);

export const roomRoute = router;