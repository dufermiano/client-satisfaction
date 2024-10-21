import { NextFunction, Request, Response } from 'express';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { QuestionRepository } from '../repositories/QuestionRepository';
import { CustomError } from '../middlewares/errorMiddleware';
import { surveySchema, getOrDeleteByIdSchema, updateSurveySchema } from '../validators/Survey';

const defaultQuestions = [
  {
    text: "Qual eh o seu publico-alvo?",
    response_type: "text"
  },
  {
    text: "Quantas estrelas voce da para os nossos produtos?",
    response_type: "number"
  },
  {
    text: "Qual eh o seu e-mail para contato?",
    response_type: "email"
  }
];

export class SurveyController {
  private surveyRepository: SurveyRepository;
  private questionRepository: QuestionRepository;

  constructor() {
    this.surveyRepository = new SurveyRepository();
    this.questionRepository = new QuestionRepository();
  }

  async create(req: Request, res: Response): Promise<void> {
    const validatedData = surveySchema.parse(req.body);

    try {
      const survey = await this.surveyRepository.create(validatedData);
      await this.questionRepository.bulkCreate(defaultQuestions, survey.id);

      const questions = await this.questionRepository.findAllBySurveyId(survey.id);

      const response = {
        id: survey.id,
        title: survey.dataValues.title,
        questions: questions.map(q => ({
          id: q.id,
          question_text: q.dataValues.question_text,
        }))
      }

      res.status(201).send(response);
    } catch (error) {
      throw new CustomError(500, 'Failed to create survey');
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const surveys = await this.surveyRepository.findAll();
      res.status(200).json(surveys);
    } catch (error) {
      throw new CustomError(500, 'Failed to fetch surveys');
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = getOrDeleteByIdSchema.parse({ ...req.params });
    try {
      const survey = await this.surveyRepository.findById(parseInt(id));
      if (!survey) {
        next(new CustomError(404, 'Survey not found'));
        return;
      }
      
      res.status(200).json(survey);
    } catch (error) {
      throw new CustomError(500, 'Failed to fetch survey');
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id, title } = updateSurveySchema.parse({ ...req.params, ...req.body });

    try {
      const survey = await this.surveyRepository.update(parseInt(id), { title });
      if (survey) {
        res.status(200).json(survey);
      } else {
        next(new CustomError(404, 'Survey not found'));
        return;
      }
    } catch (error) {
      throw new CustomError(500, 'Failed to update survey');
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = getOrDeleteByIdSchema.parse({ ...req.params });

    try {
      const survey = await this.surveyRepository.findById(parseInt(id));
      if (!survey) {
        next(new CustomError(404, 'Survey not found'));
        return;
      }
      await this.surveyRepository.delete(parseInt(id));
      res.status(204).send();
    } catch (error) {
      throw new CustomError(500, 'Failed to delete survey');
    }
  }
}
