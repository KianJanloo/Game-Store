import { z } from "zod";

const specificationsSchema = z.object({
    color: z.string().min(1, "Color is required"),
    weight: z.string().min(1, "Weight is required"),
    dimensions: z.string().min(1, "Dimensions are required"),
    material: z.string().min(1, "Material is required"),
    connectivity: z.array(z.string()).min(1, "At least one connectivity option is required"),
    compatibility: z.array(z.string()).min(1, "At least one compatibility option is required"),
    warranty: z.string().min(1, "Warranty information is required")
});

export const createProductSchema = z.object({
    title: z.string()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be less than 100 characters"),
    description: z.string()
        .min(10, "Description must be at least 10 characters")
        .max(1000, "Description must be less than 1000 characters"),
    price: z.number()
        .min(0, "Price cannot be negative")
        .max(1000000, "Price seems too high"),
    photos: z.array(z.string().url("Invalid photo URL"))
        .min(1, "At least one photo is required")
        .max(10, "Maximum 10 photos allowed"),
    category: z.enum([
        'Headset', 'Keyboard', 'Mouse', 'Mousepad', 
        'Monitor', 'Console', 'Controller', 'Chair', 
        'Microphone', 'Webcam', 'Accessories'
    ], {
        errorMap: () => ({ message: "Invalid category" })
    }),
    brand: z.string()
        .min(2, "Brand name must be at least 2 characters")
        .max(50, "Brand name must be less than 50 characters"),
    model: z.string()
        .min(2, "Model name must be at least 2 characters")
        .max(50, "Model name must be less than 50 characters"),
    specifications: specificationsSchema,
    stock: z.number()
        .int("Stock must be a whole number")
        .min(0, "Stock cannot be negative")
        .max(10000, "Stock seems too high"),
    discount: z.number()
        .min(0, "Discount cannot be negative")
        .max(100, "Discount cannot be more than 100%")
        .default(0),
    tags: z.array(z.string())
        .min(1, "At least one tag is required")
        .max(10, "Maximum 10 tags allowed")
        .optional(),
    isActive: z.boolean().default(true)
});

export const updateProductSchema = createProductSchema.partial();