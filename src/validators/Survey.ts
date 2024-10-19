import { z } from 'zod';

export const surveySchema = z.object({
    title: z.string(),
});