import { Request, Response } from 'express';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { QuestionRepository } from '../repositories/QuestionRepository';
import { surveySchema } from '../validators/Survey';

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
    try {

      const validatedData = surveySchema.parse(req.body);

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
      console.log(error);
      res.status(500).json({ error: 'Failed to create survey' });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const surveys = await this.surveyRepository.findAll();
      res.status(200).json(surveys);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Failed to fetch surveys' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const survey = await this.surveyRepository.findById(+req.params.id);
      if (survey) {
        res.status(200).json(survey);
      } else {
        res.status(404).json({ error: 'Survey not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch survey' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const survey = await this.surveyRepository.update(+req.params.id, req.body);
      if (survey) {
        res.status(200).json(survey);
      } else {
        res.status(404).json({ error: 'Survey not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update survey' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await this.surveyRepository.delete(+req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete survey' });
    }
  }
}
