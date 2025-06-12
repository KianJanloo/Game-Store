import { z } from "zod";

export const changeRoleValidation = z.object({
    userId: z.string({ required_error: "User ID is required" }).min(1, { message: "User ID is required" }),
    role: z.enum(["admin", "user"], { required_error: "Role is required" }),
})