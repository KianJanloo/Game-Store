import { z } from "zod";

export const forgetPasswordValidation = z.object({
    email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email address" }),
    url: z.string({ required_error: "URL is required" }).min(1, { message: "URL is required" }),
})