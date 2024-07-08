import httpStatus from "http-status";
import AppError from "../../Errors/AppError";
import { Room } from "../Room/room.model";
import { TSlot } from "./slot.interface";
import { convertBackToDesiredTime, convertToMinutes, getRange } from "./slot.constant";
import { Slot } from "./slot.model";

const createSlotsIntoDB = async (payload: Required<TSlot>): Promise<TSlot[]> => {

    const { room, date, startTime, endTime } = payload;


    const roomData = await Room.findById(room);


    if (!roomData) {
        throw new AppError(httpStatus.NOT_FOUND, 'Room does not exist');
    }

    if (roomData?.isDeleted === true) {
        throw new AppError(httpStatus.NOT_FOUND, 'Room deleted');
    }



    const convertStartTimeToMinutes = convertToMinutes(startTime);
    const convertEndTimeToMinutes = convertToMinutes(endTime);
    const totalDuration = convertEndTimeToMinutes - convertStartTimeToMinutes;

    const slotDuration = 60;

    const numberOfSlots = totalDuration / slotDuration;


    if (convertStartTimeToMinutes > convertEndTimeToMinutes) {
        throw new AppError(httpStatus.BAD_REQUEST, `Start time: ${startTime} should be before End Time: ${endTime}`,);
    }


    const slotDataFromDBByRoomId = await Slot.find({ room });
    const slotDBStartTimeToMinutes = slotDataFromDBByRoomId?.map(data => convertToMinutes(data.startTime));
    const slotDBEndTimeToMinutes = slotDataFromDBByRoomId?.map(data => convertToMinutes(data.endTime));

    let startAndEndTimeRanges: number[] = [];
    for (let i = 0; i < slotDBStartTimeToMinutes.length; i++) {
        startAndEndTimeRanges = startAndEndTimeRanges.concat(getRange(slotDBStartTimeToMinutes[i], slotDBEndTimeToMinutes[i]));
    }



    const slots: TSlot[] = [];

    for (let i = 0; i < numberOfSlots; i++) {
        const startTimeToMinutes = convertStartTimeToMinutes + i * slotDuration;
        const endTimeToMinutes = startTimeToMinutes + slotDuration;

        const DBStartTimeToMinutes = startAndEndTimeRanges?.filter(data => data === startTimeToMinutes)[0]

        const DBEndTimeToMinutes = startAndEndTimeRanges?.filter(data => data === endTimeToMinutes)[0]

        //console.log(startTimeToMinutes, endTimeToMinutes);
        //console.log(DBStartTimeToMinutes, DBEndTimeToMinutes)

        if (startTimeToMinutes < DBEndTimeToMinutes && endTimeToMinutes > DBStartTimeToMinutes) {
            throw new AppError(httpStatus.BAD_REQUEST, `Slot conflict found for time range ${convertBackToDesiredTime(startTimeToMinutes)} - ${convertBackToDesiredTime(endTimeToMinutes)}`,);
        }

        const startTime = convertBackToDesiredTime(startTimeToMinutes);
        const endTime = convertBackToDesiredTime(endTimeToMinutes);

        const slot = await Slot.create({
            room,
            date,
            startTime: startTime,
            endTime: endTime,
            isBooked: false,
        });

        slots.push(slot);
    }

    return slots;
};


const getAllSlotsFromDB = async (query: Record<string, unknown>) => {
    const { date, roomId } = query;

    const roomData = await Room.findById(roomId);

    if (roomData?.isDeleted === true) {
        throw new AppError(httpStatus.NOT_FOUND, 'Room deleted');
    }

    const result = await Slot.find({ room: roomId, date: date }).populate('room');
    return result;
};

const getAllSlotsThatAreNotBookedFromDB = async () => {
    const result = await Slot.find({ isBooked: false }).populate('room');
    return result;
};


export const SlotServices = {
    createSlotsIntoDB,
    getAllSlotsFromDB,
    getAllSlotsThatAreNotBookedFromDB,
};