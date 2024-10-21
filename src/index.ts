require('dotenv').config();
import express from 'express';
import cors from 'cors';
import sequelize from './database';
import bodyParser from 'body-parser';
import surveyRoutes from './routes/SurveyRoutes';
import questionRoutes from './routes/QuestionRoutes';
import answerRoutes from './routes/AnswerRoutes';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/v1/surveys', surveyRoutes);
app.use('/v1/questions', questionRoutes);
app.use('/v1/answers', answerRoutes);

app.use(errorMiddleware);

sequelize.sync({ alter: true }).then(() => {
  console.log('Database connection established.');

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}).catch((err: Error) => {
  console.error('Error connecting to database:', err);
});
