import { NextFunction, Request, Response } from 'express';
import { AnswerRepository } from '../repositories/AnswerRepository';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { QuestionRepository } from '../repositories/QuestionRepository';
import { CustomError } from '../middlewares/errorMiddleware';
import { answerSchema, getBySurveyIdSchema, listByTargetSchema } from '../validators/Answer';

export class AnswerController {
  private answerRepository: AnswerRepository;
  private surveyRepository: SurveyRepository;
  private questionRepository: QuestionRepository;

  constructor() {
    this.answerRepository = new AnswerRepository();
    this.surveyRepository = new SurveyRepository();
    this.questionRepository = new QuestionRepository();
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { survey_id, question_id, answer_text, stars } = answerSchema.parse(req.body);
    try {
      const surveyExists = await this.surveyRepository.findById(survey_id);
      const questionExists = await this.questionRepository.findById(question_id);

      if (!surveyExists || !questionExists) {
        next(new CustomError(404, 'Survey or Question not found'));
        return;
      }

      const answer = await this.answerRepository.create({
        survey_id,
        question_id,
        answer_text,
        stars,
      });

      res.status(201).json(answer);
    } catch (error) {
      throw new CustomError(500, 'Failed to create answer');
    }
  }

  async findBySurveyId(req: Request, res: Response): Promise<void> {
    const { survey_id } = getBySurveyIdSchema.parse({ ...req.params })

    try {
      const answers = await this.answerRepository.findBySurveyId(Number(survey_id));
      res.status(200).json(answers);
    } catch (error) {
      throw new CustomError(500, 'Failed to fetch answers');
    }
  }

  async listByTarget(req: Request, res: Response): Promise<void> {
    const { target, order } = listByTargetSchema.parse({...req.query});

    try {
      const answers = await this.answerRepository.findByTargetAudience(target as string, order ? (order as 'ASC' | 'DESC') : undefined);

      res.status(200).json(answers);
    } catch (error) {
      throw new CustomError(500, 'Failed to fetch answers');
    }
  }
}
