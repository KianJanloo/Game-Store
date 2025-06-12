import { z } from "zod";

export const refreshValidation = z.object({
    refreshToken: z.string({ required_error: "Refresh token is required" }).min(1, "Refresh token is required"),
})