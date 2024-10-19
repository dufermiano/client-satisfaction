import { Survey } from '../models/Survey';
import { Question } from '../models/Question';
import { Answer } from '../models/Answer';

export class SurveyRepository {
  async create(data: Partial<Survey>): Promise<Survey> {
    return await Survey.create(data);
  }

  async findAll(): Promise<Survey[]> {
    return await Survey.findAll({
      include: [Question, Answer],
    });
  }

  async findById(id: number): Promise<Survey | null> {
    return await Survey.findByPk(id, {
      include: [Question, Answer],
    });
  }

  async update(id: number, data: Partial<Survey>): Promise<Survey | null> {
    const survey = await this.findById(id);
    if (survey) {
      return await survey.update(data);
    }
    return null;
  }

  async delete(id: number): Promise<void> {
    const survey = await this.findById(id);
    if (survey) {
      await survey.destroy();
    }
  }
}
