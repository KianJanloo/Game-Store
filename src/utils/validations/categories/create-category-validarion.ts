import { z } from "zod";

export const createCategoryValidation = z.object({
    title: z.enum(['Headset', 'Keyboard', 'Mouse', 'Mousepad', 'Monitor', 'Console', 'Controller', 'Chair', 'Microphone', 'Webcam', 'Accessories', "PC", "Laptop"], { required_error: "Title is required" }),
})