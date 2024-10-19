import { Question } from '../models/Question';

interface DefaultQuestion {
  text: string;
  response_type: string;
}

export class QuestionRepository {
  async create(data: Partial<Question>): Promise<Question> {
    return await Question.create(data);
  }

  async bulkCreate(questions: DefaultQuestion[], survey_id: number): Promise<Question[]> {
    return await Question.bulkCreate(
      questions.map(question => ({
        question_text: question.text,
        response_type: question.response_type,
        survey_id, 
      }))
    )
  }

  async findAll(): Promise<Question[]> {
    return await Question.findAll();
  }

  async findAllBySurveyId(surveyId: number): Promise<Question[]> {
    return await Question.findAll({
      where: {
        survey_id: surveyId
      }
    })
  }

  async findById(id: number): Promise<Question | null> {
    return await Question.findByPk(id);
  }

  async update(id: number, data: Partial<Question>): Promise<Question | null> {
    const question = await this.findById(id);
    if (question) {
      return await question.update(data);
    }
    return null;
  }

  async delete(id: number): Promise<void> {
    const question = await this.findById(id);
    if (question) {
      await question.destroy();
    }
  }
}
