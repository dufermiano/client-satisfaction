import { z } from 'zod';

export const answerSchema = z.object({
  survey_id: z.number().int().positive('Survey ID must be a positive integer'),
  question_id: z.number().int().positive('Question ID must be a positive integer'),
  answer_text: z.string().min(1, 'Question text is required').optional(),
  stars: z.number().optional()
}).strict();

export const getBySurveyIdSchema = z.object({
  survey_id: z.string(),
}).strict();

export const listByTargetSchema = z.object({
  target: z.string(),
  order: z.string().optional(),
}).strict();

