import z from 'zod';

export const createCommentValidate = z.object({
    title: z.string({ required_error: "Title is empty please insert the title." }).min(1, "Title is empty please insert the title."),
    message: z.string({ required_error: "Message is empty please insert the message." }).min(20, "Message must be more than 20 characters."),
})