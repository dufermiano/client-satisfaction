import { Request, Response } from 'express';
import { AnswerRepository } from '../repositories/AnswerRepository';

export class AnswerController {
  private answerRepository: AnswerRepository;

  constructor() {
    this.answerRepository = new AnswerRepository();
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const answer = await this.answerRepository.create(req.body);
      res.status(201).json(answer);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create answer' });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const answers = await this.answerRepository.findAll();
      res.status(200).json(answers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch answers' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const answer = await this.answerRepository.findById(+req.params.id);
      if (answer) {
        res.status(200).json(answer);
      } else {
        res.status(404).json({ error: 'Answer not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch answer' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const answer = await this.answerRepository.update(+req.params.id, req.body);
      if (answer) {
        res.status(200).json(answer);
      } else {
        res.status(404).json({ error: 'Answer not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update answer' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await this.answerRepository.delete(+req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete answer' });
    }
  }
}
