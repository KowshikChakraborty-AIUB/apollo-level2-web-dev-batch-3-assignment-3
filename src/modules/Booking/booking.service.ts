import mongoose from "mongoose";
import { TBooking } from "./booking.interface";
import { Room } from "../Room/room.model";
import AppError from "../../Errors/AppError";
import httpStatus from "http-status";
import { User } from "../User/user.model";
import { Slot } from "../Slot/slot.model";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (payload: TBooking) => {

    const session = await mongoose.startSession();

    const { date, slots, room, user, isConfirmed } = payload;

    try {
        session.startTransaction();

        const slotsData = await Slot.find(
            { _id: { $in: slots }, isBooked: false}, null, {session}
        );


        if (!slotsData) {
            throw new AppError(httpStatus.NOT_FOUND, 'Requested slots not found');
        }

        if (slotsData.length !== slots.length) {
            throw new AppError(httpStatus.NOT_FOUND, 'Requested slots have already been booked or not found');
        } // suppose two slots id given as isBooked true and false. But slotData will receive only false value since we are applying isBooked false in find query. So, slotData length will be 1 but slots length will be 2. That means one of the slots have already been booked (isBooked true) or it doesn't exist.


        const roomData = await Room.findById(payload.room, null, { session });
        if (!roomData) {
            throw new AppError(httpStatus.NOT_FOUND, 'Room not found');
        }


        if (roomData?.isDeleted) {
            throw new AppError(httpStatus.NOT_FOUND, 'Room deleted');
        }

        const userData = await User.findOne({ _id: payload.user, role: 'user' }, null, { session })

        if (!userData) {
            throw new AppError(httpStatus.NOT_FOUND, 'User not found');
        }

        const pricePerSlot = roomData.pricePerSlot;
        const totalAmount = payload.slots.length * pricePerSlot;


        const booking = await Booking.create([{ date, slots, room, user, totalAmount: totalAmount, isConfirmed }], { session });


        if (!booking.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create booking');
        }

        const updatedSlotsAfterBooking = await Slot.updateMany(
            { _id: { $in: payload.slots } },
            { isBooked: true },
            { session },
        );

        if (!updatedSlotsAfterBooking) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to update requested slots after booking',
            );
        }


        await session.commitTransaction();
        await session.endSession();

        return booking;

    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error('Failed to create booking');
    }
};


export const BookingServices = {
    createBookingIntoDB,
}