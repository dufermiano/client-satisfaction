// src/repositories/PesquisaRepository.ts
import { Pesquisa } from '../models/Pesquisa';
import { Preenchimento } from '../models/Preenchimento';

export class PesquisaRepository {
  async criarPesquisa(data: { publicoAlvo: string; quantidadeEstrelas: number; email: string }) {
    return await Pesquisa.create(data);
  }

  async atualizarPesquisa(id: number, data: { quantidadeEstrelas?: number }) {
    const pesquisa = await Pesquisa.findByPk(id);
    if (!pesquisa) throw new Error('Pesquisa não encontrada');

    await pesquisa.update(data);
    return pesquisa;
  }

  async listarPreenchimentosPorPesquisa(pesquisaId: number) {
    return await Preenchimento.findAll({
      where: { pesquisaId },
      order: [['quantidadeEstrelas', 'DESC']],
    });
  }

  async obterPesquisaPorId(id: number) {
    return await Pesquisa.findByPk(id, {
      include: [Preenchimento], // Incluindo os preenchimentos relacionados
    });
  }

  async excluirPesquisa(id: number) {
    const pesquisa = await Pesquisa.findByPk(id);
    if (!pesquisa) throw new Error('Pesquisa não encontrada');

    await pesquisa.destroy();
  }
}
