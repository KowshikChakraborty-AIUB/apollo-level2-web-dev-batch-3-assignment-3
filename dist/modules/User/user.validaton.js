"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
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
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
        role: zod_1.z.enum(['user', 'admin']),
    }),
});
exports.default = userValidationSchema;
