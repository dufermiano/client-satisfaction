import { z } from 'zod';

export const surveySchema = z.object({
    title: z.string(),
}).strict();

export const getOrDeleteByIdSchema = z.object({
    id: z.string(),
}).strict();

export const updateSurveySchema = z.object({
    id: z.string(),
    title: z.string(),
}).strict();
