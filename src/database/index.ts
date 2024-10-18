// src/database/index.ts
import { Sequelize } from 'sequelize-typescript';
import { Pesquisa } from '../models/Pesquisa';
import { Preenchimento } from '../models/Preenchimento';

// Criação da instância Sequelize para MySQL
const sequelize = new Sequelize({
  dialect: 'mysql', // Use 'mysql' se você estiver usando o MySQL
  host: process.env.DB_HOST || 'localhost', // Deve ser 'db' no Docker
  username: process.env.DB_USER || 'user', // Nome de usuário
  password: process.env.DB_PASSWORD || 'password', // Senha
  database: process.env.DB_NAME || 'pesquisadb', // Nome do banco de dados
  models: [Pesquisa, Preenchimento], // Modelos a serem utilizados
});

export default sequelize;
