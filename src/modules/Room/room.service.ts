import { TRoom } from './room.interface';
import { Room } from './room.model';

const createRoomIntoDB = async (payload: TRoom) => {
    const result = Room.create(payload);
    return result;
};

const getSingleRoomFromDB = async (id: string) => {
    const result = await Room.findById(id);
    return result;
};

export const RoomServices = {
    createRoomIntoDB,
    getSingleRoomFromDB,
}