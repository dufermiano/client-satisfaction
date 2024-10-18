import { Request, Response } from 'express';
import { ResearchRepository } from '../repositories/ResearchRepository';

export class ResearchController {
  private researchRepository: ResearchRepository;

  constructor() {
    this.researchRepository = new ResearchRepository();
  }

  async createResearch(req: Request, res: Response) {
    try {
      const { target, stars, email } = req.body;
      const newResearch = await this.researchRepository.create({
        target,
        stars,
        email,
      });
      return res.status(201).json(newResearch);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
