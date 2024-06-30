import { Router } from 'express';
import validateRequest from "../../Middlewares/validateRequest";
import { RoomControllers } from "./room.controller";
import { RoomValidations } from "./room.validation";
import auth from '../../Middlewares/auth';
import { USER_ROLE } from '../User/user.constant';


const router = Router();

router.post(
    '/',
    auth(USER_ROLE.admin),
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