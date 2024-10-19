import { Op } from 'sequelize';
import { Answer } from '../models/Answer';
import { Question } from '../models/Question';

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
    const audienceAnswers = await Answer.findAll({
      include: [
        {
          model: Question,
          as: 'question',
          where: {
            question_text: { [Op.like]: '%público-alvo%' },
            response_type: 'text',
          },
        },
      ],
      where: {
        answer_text: { [Op.like]: `%${targetAudience}%` },
      },
    });

    const starAnswers = await Answer.findAll({
      include: [
        {
          model: Question,
          as: 'question',
          where: {
            response_type: 'number',
          },
        },
      ],
      where: {
        survey_id: {
          [Op.in]: audienceAnswers.map(answer => answer.survey_id),
        },
      },
      order: orderByStars ? [['stars', orderByStars]] : [],
    });

    return [...audienceAnswers, ...starAnswers];
  }
}
