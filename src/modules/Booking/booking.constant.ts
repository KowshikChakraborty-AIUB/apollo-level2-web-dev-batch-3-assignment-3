import { z } from "zod";

// Define the schema for date in YYYY-MM-DD format
export const dateSchema = z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, should be YYYY-MM-DD")
    .refine(dateString => !isNaN(Date.parse(dateString)), {
        message: "Invalid date",
    })
    .transform(dateString => new Date(dateString));