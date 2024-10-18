import { Research } from '../models/Research';
import { Questions } from '../models/Questions';

export class ResearchRepository {
  async create(data: { target: string; stars: number; email: string }) {
    return await Research.create(data);
  }

  async update(id: number, data: { stars?: number }) {
    const research = await Research.findByPk(id);
    if (!research) throw new Error('Pesquisa não encontrada');

    await research.update(data);
    return research;
  }

  async getQuestionsByResearch(researchId: number) {
    return await Questions.findAll({
      where: { researchId },
      order: [['stars', 'DESC']],
    });
  }

  async getResearchById(id: number) {
    return await Research.findByPk(id, {
      include: [Questions], 
    });
  }

  async deleteResearch(id: number) {
    const research = await Research.findByPk(id);
    if (!research) throw new Error('Pesquisa não encontrada');

    await research.destroy();
  }
}
