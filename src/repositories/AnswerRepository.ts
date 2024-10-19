import { Answer } from '../models/Answer';

export class AnswerRepository {
  async create(data: Partial<Answer>): Promise<Answer> {
    return await Answer.create(data);
  }

  async findAll(): Promise<Answer[]> {
    return await Answer.findAll();
  }

  async findById(id: number): Promise<Answer | null> {
    return await Answer.findByPk(id);
  }

  async update(id: number, data: Partial<Answer>): Promise<Answer | null> {
    const answer = await this.findById(id);
    if (answer) {
      return await answer.update(data);
    }
    return null;
  }

  async delete(id: number): Promise<void> {
    const answer = await this.findById(id);
    if (answer) {
      await answer.destroy();
    }
  }
}
