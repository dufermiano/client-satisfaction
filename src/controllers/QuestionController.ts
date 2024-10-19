import { Request, Response } from 'express';
import { QuestionRepository } from '../repositories/QuestionRepository';

export class QuestionController {
  private questionRepository: QuestionRepository;

  constructor() {
    this.questionRepository = new QuestionRepository();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const question = await this.questionRepository.create(req.body);
      res.status(201).json(question);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create question' });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const questions = await this.questionRepository.findAll();
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch questions' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const question = await this.questionRepository.findById(+req.params.id);
      if (question) {
        res.status(200).json(question);
      } else {
        res.status(404).json({ error: 'Question not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch question' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const question = await this.questionRepository.update(+req.params.id, req.body);
      if (question) {
        res.status(200).json(question);
      } else {
        res.status(404).json({ error: 'Question not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update question' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await this.questionRepository.delete(+req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete question' });
    }
  }
}
