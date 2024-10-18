import { Request, Response } from 'express';
import { PesquisaRepository } from '../repositories/PesquisaRepository'; // exemplo de repositório

export class PesquisaController {
  private pesquisaRepository: PesquisaRepository;

  constructor() {
    this.pesquisaRepository = new PesquisaRepository();
  }

  async criarPesquisa(req: Request, res: Response) {
    try {
      const { publicoAlvo, quantidadeEstrelas, email } = req.body;
      const novaPesquisa = await this.pesquisaRepository.criarPesquisa({
        publicoAlvo,
        quantidadeEstrelas,
        email,
      });
      return res.status(201).json(novaPesquisa);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
