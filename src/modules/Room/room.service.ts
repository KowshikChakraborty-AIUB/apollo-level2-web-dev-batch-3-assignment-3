import httpStatus from 'http-status';
import { TRoom } from './room.interface';
import { Room } from './room.model';
import AppError from '../../Errors/AppError';

const createRoomIntoDB = async (payload: TRoom) => {
    const result = Room.create(payload);
    return result;
};

const getSingleRoomFromDB = async (id: string) => {
    const result = await Room.findById(id);
    return result;
};

const getAllRoomFromDB = async () => {
    const result = Room.find();
    return result;
};

const updateRoomIntoDB = async (id: string, payload: Partial<TRoom>) => {
    const roomData = await Room.findById(id);

    if (!roomData) {
        throw new AppError(httpStatus.NOT_FOUND, 'Room does not exist');
    }

    const result = await Room.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};

export const RoomServices = {
    createRoomIntoDB,
    getSingleRoomFromDB,
    getAllRoomFromDB,
    updateRoomIntoDB,
}