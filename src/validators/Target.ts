import { z } from 'zod';

export const targetSchema = z.object({
    name: z.string(),
}).strict();

export const getOrDeleteByIdSchema = z.object({
    id: z.string(),
}).strict();

export const updateTargetSchema = z.object({
    id: z.string(),
    name: z.string(),
}).strict();
