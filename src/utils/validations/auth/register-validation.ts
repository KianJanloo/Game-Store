import { z } from "zod";

export const registerValidation = z.object({
    username: z.string({ required_error: "Username is required" }).min(3, "Username must be at least 3 characters"),
    email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters"),
})