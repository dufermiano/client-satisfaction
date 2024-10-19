import { Request, Response } from 'express';
import { AnswerRepository } from '../repositories/AnswerRepository';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { QuestionRepository } from '../repositories/QuestionRepository';
import { answerSchema } from '../validators/Answer';
export class AnswerController {
  private answerRepository: AnswerRepository;
  private surveyRepository: SurveyRepository;
  private questionRepository: QuestionRepository;

  constructor() {
    this.answerRepository = new AnswerRepository();
    this.surveyRepository = new SurveyRepository();
    this.questionRepository = new QuestionRepository();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { survey_id, question_id, answer_text, stars } = answerSchema.parse(req.body);

      const surveyExists = await this.surveyRepository.findById(survey_id);
      const questionExists = await this.questionRepository.findById(question_id);

      if (!surveyExists || !questionExists) {
        res.status(404).json({ error: 'Survey or Question not found' });
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
      console.error('Error creating answer:', error);
      res.status(500).json({ error: 'Failed to create answer' });
    }
  }

  async findBySurveyId(req: Request, res: Response): Promise<void> {
    try {
      const { survey_id } = req.params;

      const answers = await this.answerRepository.findBySurveyId(Number(survey_id));
      res.status(200).json(answers);
    } catch (error) {
      console.error('Error fetching answers:', error);
      res.status(500).json({ error: 'Failed to fetch answers' });
    }
  }

  async listByTarget(req: Request, res: Response): Promise<void> {
    try {
      const { target, order } = req.query;
      const answers = await this.answerRepository.findByTargetAudience(target as string, order ? (order as 'ASC' | 'DESC') : undefined);
      
      res.status(200).json(answers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch answers' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const answer = await this.answerRepository.findById(Number(id));
      if (!answer) {
        res.status(404).json({ error: 'Answer not found' });
        return;
      }

      await this.answerRepository.update(Number(id), updateData);
      res.status(200).json({ message: 'Answer updated successfully' });
    } catch (error) {
      console.error('Error updating answer:', error);
      res.status(500).json({ error: 'Failed to update answer' });
    }
  }
}
