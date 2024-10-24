import { Sequelize } from 'sequelize';
import { Answer } from '../models/Answer';
import { Target } from '../models/Target';

export class AnswerRepository {
  async create(data: Partial<Answer>): Promise<Answer> {
    return await Answer.create(data);
  }

  async findBySurveyId(survey_id: number): Promise<Answer[]> {
    return await Answer.findAll(
      {
        where: {
          survey_id
        }
      }
    );
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

  async findByTargetAudience(targetAudience: string, orderByStars?: 'ASC' | 'DESC'): Promise<Answer[]> {
    return await Answer.findAll({
      include: [
        {
          model: Target,
          as: 'target',
          where: { name: targetAudience },
        }
      ],
      logging: console.log,
      ...(orderByStars && {
        order: [
          [Sequelize.literal('stars'), orderByStars]
        ]
      })
    });
  }
}
