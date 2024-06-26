"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateSchema = void 0;
const zod_1 = require("zod");
// Define the schema for date in YYYY-MM-DD format
exports.dateSchema = zod_1.z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, should be YYYY-MM-DD")
    .refine(dateString => !isNaN(Date.parse(dateString)), {
    message: "Invalid date",
})
    .transform(dateString => new Date(dateString));
