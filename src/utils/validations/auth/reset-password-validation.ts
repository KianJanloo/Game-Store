import { z } from "zod";

export const resetPasswordValidation = z.object({
    token: z.string({ required_error: "Token is required" }).min(1, { message: "Token is required" }),
    newPassword: z.string({ required_error: "New password is required" }).min(8, { message: "New password must be at least 8 characters long" }),
    confirmPassword: z.string({ required_error: "Confirm password is required" }).min(8, { message: "Confirm password must be at least 8 characters long" }),
})