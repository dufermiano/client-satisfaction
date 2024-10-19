import { z } from 'zod';

const ResponseTypeEnum = z.enum(['text', 'email', 'number']);

export const questionSchema = z.object({
  survey_id: z.number().int().positive('Survey ID must be a positive integer'),
  question_text: z.string().min(1, 'Question text is required'),
  response_type: ResponseTypeEnum,
});
