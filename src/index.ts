import express, { Request, Response } from 'express';
import sequelize from './database';
import { PesquisaController } from './controllers/PesquisaController';

const app = express();

app.use(express.json());

const pesquisaController = new PesquisaController();

app.get('/', (req: Request, res: Response) => {
  res.json('Hello World');
});

app.post('/pesquisas', (req: Request, res: Response) => {
  pesquisaController.criarPesquisa(req, res);
});

sequelize.sync().then(() => {
  console.log('Conexão com o banco de dados estabelecida.');

  app.listen(3001, () => {
    console.log('Servidor rodando na porta 3000');
  });
}).catch((err: Error) => {
  console.error('Erro ao conectar com o banco de dados:', err);
});
