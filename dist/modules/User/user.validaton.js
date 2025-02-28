"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidationSchema = exports.userValidationSchema = void 0;
const zod_1 = require("zod");
exports.userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        email: zod_1.z.string().email(),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
        phone: zod_1.z.string({
            required_error: 'Phone number is required',
        }),
        profileImg: zod_1.z.string().url('Invalid URL').optional(),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
        role: zod_1.z.enum(['user', 'admin']),
    }),
});
exports.updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required').nullish(),
        phone: zod_1.z.string().min(1, 'Phone number is required').nullish(),
        profileImg: zod_1.z.string().url('Invalid URL').optional(),
        address: zod_1.z.string().min(1, 'Address is required').nullish(),
    }),
});
