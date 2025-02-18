import { z } from 'zod';

export const userValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }),
        email: z.string().email(),
        password: z.string({
            required_error: 'Password is required',
        }),
        phone: z.string({
            required_error: 'Phone number is required',
        }),
        profileImg: z.string().url('Invalid URL').optional(),
        address: z.string({
            required_error: 'Address is required',
        }),
        role: z.enum(['user', 'admin']),
    }),
});

export const updateUserValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name is required').nullish(),
        phone: z.string().min(1, 'Phone number is required').nullish(),
        profileImg: z.string().url('Invalid URL').optional(),
        address: z.string().min(1, 'Address is required').nullish(),
    }),
});