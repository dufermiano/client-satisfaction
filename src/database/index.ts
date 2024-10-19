import { Sequelize } from 'sequelize-typescript';
import { Research } from '../models/Research';
import { Questions } from '../models/Questions';
import { Target } from '../models/Target';

const sequelize = new Sequelize({
  dialect: 'mysql',
  port: 3306,
  host: process.env.DB_HOST || 'db',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [Research, Questions, Target],
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
