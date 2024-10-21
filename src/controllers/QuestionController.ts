import { NextFunction, Request, Response } from 'express';
import { QuestionRepository } from '../repositories/QuestionRepository';
import { questionSchema, getOrDeleteQuestionByIdSchema, getQuestionBySurveyIdSchema, updateQuestionSchema } from '../validators/Question';
import { CustomError } from '../middlewares/errorMiddleware';

export class QuestionController {
  private questionRepository: QuestionRepository;

  constructor() {
    this.questionRepository = new QuestionRepository();
  }

  async create(req: Request, res: Response): Promise<void> {
    const validatedData = questionSchema.parse(req.body);
    try {
      const question = await this.questionRepository.create(validatedData);
      res.status(201).json(question);
    } catch (error) {
      throw new CustomError(500, 'Failed to create question');
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const questions = await this.questionRepository.findAll();
      res.status(200).json(questions);
    } catch (error) {
      throw new CustomError(500, 'Failed to fetch questions');
    }
  }

  async getBySurveyId(req: Request, res: Response): Promise<void> {
    const { survey_id } = getQuestionBySurveyIdSchema.parse({ ...req.params });

    try {
      const questions = await this.questionRepository.findAllBySurveyId(parseInt(survey_id));
      res.status(200).json(questions);
    } catch (error) {
      throw new CustomError(500, `Failed to fetch questions by survey id ${survey_id}`);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = getOrDeleteQuestionByIdSchema.parse({ ...req.params });

    try {
      const question = await this.questionRepository.findById(parseInt(id));
      if (!question) {
        next(new CustomError(404, 'Question not found'));
        return;
      }

      res.status(200).json(question);
    } catch (error) {
      throw new CustomError(500, 'Failed to fetch question');
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id: survey_id, question_text, response_type } = updateQuestionSchema.parse({ ...req.params, ...req.body });
    try {
      const question = await this.questionRepository.update(parseInt(survey_id), { question_text, response_type });
      if (!question) {
        next(new CustomError(404, 'Question not found'));
        return;
      }
      
      res.status(200).json(question);
    } catch (error) {
      throw new CustomError(500, 'Failed to update question');
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = getOrDeleteQuestionByIdSchema.parse({ ...req.params });

    try {
      const question = await this.questionRepository.findById(parseInt(id));
      if (!question) {
        next(new CustomError(404, 'Question not found'));
        return;
      }
      await this.questionRepository.delete(parseInt(id));
      res.status(204).send();
    } catch (error) {
      throw new CustomError(500, 'Failed to delete question');
    }
  }
}
