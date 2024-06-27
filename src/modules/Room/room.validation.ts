import { z } from 'zod';

const roomValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }),
        roomNo: z.number({
            required_error: 'Room No. is required',
        }),
        floorNo: z.number({
            required_error: 'Floor No. is required',
        }),
        capacity: z.number({
            required_error: 'Capacity is required',
        }),
        pricePerSlot: z.number({
            required_error: 'Price per slot is required',
        }),
        amenities: z.array(z.string({
            required_error: 'Amenities are required',
        })),
    }),
});

const updateRoomValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        roomNo: z.number().optional(),
        floorNo: z.number().optional(),
        capacity: z.number().optional(),
        pricePerSlot: z.number().optional(),
        amenities: z.array(z.string()).optional(),
    }),
});

export const RoomValidations = {
    roomValidationSchema,
    updateRoomValidationSchema
};