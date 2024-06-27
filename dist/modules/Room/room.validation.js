"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomValidations = void 0;
const zod_1 = require("zod");
const roomValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        roomNo: zod_1.z.number({
            required_error: 'Room No. is required',
        }),
        floorNo: zod_1.z.number({
            required_error: 'Floor No. is required',
        }),
        capacity: zod_1.z.number({
            required_error: 'Capacity is required',
        }),
        pricePerSlot: zod_1.z.number({
            required_error: 'Price per slot is required',
        }),
        amenities: zod_1.z.array(zod_1.z.string({
            required_error: 'Amenities are required',
        })),
    }),
});
const updateRoomValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        roomNo: zod_1.z.number().optional(),
        floorNo: zod_1.z.number().optional(),
        capacity: zod_1.z.number().optional(),
        pricePerSlot: zod_1.z.number().optional(),
        amenities: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.RoomValidations = {
    roomValidationSchema,
    updateRoomValidationSchema
};
