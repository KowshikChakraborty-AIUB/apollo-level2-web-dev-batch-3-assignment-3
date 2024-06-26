"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    room: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    slots: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Slot',
            required: true
        }
    ],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    isConfirmed: {
        type: String,
        enum: ['unconfirmed', 'confirmed', 'canceled'],
        default: 'unconfirmed',
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
});
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
