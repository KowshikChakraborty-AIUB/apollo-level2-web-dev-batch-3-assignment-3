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

export const RoomValidations = {
    roomValidationSchema,
};