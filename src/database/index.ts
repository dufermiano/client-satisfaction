import { Sequelize } from 'sequelize-typescript';
import { Pesquisa } from '../models/Pesquisa';
import { Perguntas } from '../models/Perguntas';
import { PublicoAlvo } from '../models/PublicoAlvo';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'pesquisadb',
  models: [Pesquisa, Perguntas, PublicoAlvo],
});

export default sequelize;
