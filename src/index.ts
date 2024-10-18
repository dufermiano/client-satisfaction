import express, { Request, Response } from 'express';
import cors from 'cors';
import sequelize from './database';
import { ResearchController } from './controllers/ResearchController';

const app = express();

app.use(express.json());
app.use(cors());

const researchController = new ResearchController();

app.get('/', (req: Request, res: Response) => {
  res.json('Hello World');
});

app.post('/research', (req: Request, res: Response) => {
  researchController.createResearch(req, res);
});

sequelize.sync({ alter: true, force: true }).then(() => {
  console.log('Database connection established.');

  app.listen(3001, () => {
    console.log('Server listening on port 3001');
  });
}).catch((err: Error) => {
  console.error('Error connecting to database:', err);
});
