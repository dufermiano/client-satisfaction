import { Sequelize } from 'sequelize-typescript';
import { Research } from '../models/Research';
import { Questions } from '../models/Questions';
import { Target } from '../models/Target';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'researchdb',
  models: [Research, Questions, Target],
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
