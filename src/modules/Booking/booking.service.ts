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
            { _id: { $in: slots }, isBooked: false }, null, { session }
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

        //console.log(booking[0]);


        const bookingId = booking[0]._id;
        //since to pass a `session` to `Model.create()` in Mongoose, we **must** pass an array as the first argument, we can get the booking info by accessing the first element (0) of the array since we will get only one booking in the array everytime while creating. 



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

        const seeBookingDetailsAfterCreating = await Booking.findById(bookingId, null, { session }).populate('slots').populate('room').populate('user', '-password')

        await session.commitTransaction();
        await session.endSession();

        return seeBookingDetailsAfterCreating;

    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error('Failed to create booking');
    }
};


const getAllBookingsFromDB = async () => {
    const result = await Booking.find().populate('slots').populate('room').populate('user', '-password')

    return result;
};


const updateBookingIntoDB = async (id: string) => {
    const bookingData = await Booking.findById(id);

    if (!bookingData) {
        throw new AppError(httpStatus.NOT_FOUND, 'Booking info not found');
    }

    if (bookingData.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Booking has already been deleted');
    }

    const result = await Booking.findByIdAndUpdate(id, { isConfirmed: 'confirmed' },
        {
            new: true,
            runValidators: true,
        },
    );
    return result;
};


export const BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    updateBookingIntoDB
}