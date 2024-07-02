"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const room_model_1 = require("../Room/room.model");
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../User/user.model");
const slot_model_1 = require("../Slot/slot.model");
const booking_model_1 = require("./booking.model");
const createBookingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    const { date, slots, room, user, isConfirmed } = payload;
    try {
        session.startTransaction();
        const slotsData = yield slot_model_1.Slot.find({ _id: { $in: slots }, isBooked: false }, null, { session });
        if (!slotsData) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Requested slots not found');
        }
        if (slotsData.length !== slots.length) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Requested slots have already been booked or not found');
        } // suppose two slots id given as isBooked true and false. But slotData will receive only false value since we are applying isBooked false in find query. So, slotData length will be 1 but slots length will be 2. That means one of the slots have already been booked (isBooked true) or it doesn't exist.
        const roomData = yield room_model_1.Room.findById(payload.room, null, { session });
        if (!roomData) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room not found');
        }
        if (roomData === null || roomData === void 0 ? void 0 : roomData.isDeleted) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Room deleted');
        }
        const userData = yield user_model_1.User.findOne({ _id: payload.user, role: 'user' }, null, { session });
        if (!userData) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
        }
        const pricePerSlot = roomData.pricePerSlot;
        const totalAmount = payload.slots.length * pricePerSlot;
        const booking = yield booking_model_1.Booking.create([{ date, slots, room, user, totalAmount: totalAmount, isConfirmed }], { session });
        //console.log(booking[0]);
        const bookingId = booking[0]._id;
        //since to pass a `session` to `Model.create()` in Mongoose, we **must** pass an array as the first argument, we can get the booking info by accessing the first element (0) of the array since we will get only one booking in the array everytime while creating. 
        if (!booking.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create booking');
        }
        const updatedSlotsAfterBooking = yield slot_model_1.Slot.updateMany({ _id: { $in: payload.slots } }, { isBooked: true }, { session });
        if (!updatedSlotsAfterBooking) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update requested slots after booking');
        }
        const seeBookingDetailsAfterCreating = yield booking_model_1.Booking.findById(bookingId, null, { session }).populate('slots').populate('room').populate('user', '-password');
        yield session.commitTransaction();
        yield session.endSession();
        return seeBookingDetailsAfterCreating;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error('Failed to create booking');
    }
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find().populate('slots').populate('room').populate('user', '-password');
    return result;
});
const updateBookingIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingData = yield booking_model_1.Booking.findById(id);
    if (!bookingData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Booking info not found');
    }
    if (bookingData.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Booking has already been deleted');
    }
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, { isConfirmed: 'confirmed' }, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteBookingFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingData = yield booking_model_1.Booking.findById(id);
    if (!bookingData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Booking info not found');
    }
    if (bookingData.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Booking has already been deleted');
    }
    const result = yield booking_model_1.Booking.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    updateBookingIntoDB,
    deleteBookingFromDB
};
