import { Sequelize } from 'sequelize-typescript';
import { Survey } from '../models/Survey';
import { Question } from '../models/Question';
import { Answer } from '../models/Answer';

const sequelize = new Sequelize({
  dialect: 'mysql',
  port: 3306,
  host: process.env.DB_HOST || 'db',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [Survey, Question, Answer],
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
