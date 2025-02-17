import { z } from 'zod';

const userValidationSchema = z.object({
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

export default userValidationSchema;