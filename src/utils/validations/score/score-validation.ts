import z from 'zod';

export const editScoreValidation = z.object({
    amount: z.number({ required_error: " amount is undefined. " }).min(1, " amount is undefined. "),
})