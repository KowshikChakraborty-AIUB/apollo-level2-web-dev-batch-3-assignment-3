import httpStatus from 'http-status';
import { TRoom } from './room.interface';
import { Room } from './room.model';
import AppError from '../../Errors/AppError';

const createRoomIntoDB = async (payload: TRoom) => {
    const roomData = await Room.find({ roomNo: payload.roomNo })
    if (roomData[0]) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Room already exist');
    }

    const result = Room.create(payload);
    return result;
};

const getSingleRoomFromDB = async (id: string) => {
    const result = await Room.findById(id);
    return result;
};

const getAllRoomFromDB = async () => {
    const result = await Room.find({isDeleted: false});
    return result;
};

const updateRoomIntoDB = async (id: string, payload: Partial<TRoom>) => {
    const roomData = await Room.findById(id);

    if (!roomData) {
        throw new AppError(httpStatus.NOT_FOUND, 'Room does not exist');
    }

    if (roomData?.isDeleted === true) {
        throw new AppError(httpStatus.NOT_FOUND, 'Room deleted');
    }

    const result = await Room.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};

const deleteRoomFromDB = async (id: string) => {
    const roomData = await Room.findById(id);

    if (!roomData) {
        throw new AppError(httpStatus.NOT_FOUND, 'Room does not exist');
    }

    if (roomData?.isDeleted === true) {
        throw new AppError(httpStatus.NOT_FOUND, 'Room already deleted');
    }

    const result = await Room.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    return result;
};

export const RoomServices = {
    createRoomIntoDB,
    getSingleRoomFromDB,
    getAllRoomFromDB,
    updateRoomIntoDB,
    deleteRoomFromDB
}