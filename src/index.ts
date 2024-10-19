require('dotenv').config();
import express from 'express';
import cors from 'cors';
import sequelize from './database';
import bodyParser from 'body-parser';
import surveyRoutes from './routes/SurveyRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/v1/surveys', surveyRoutes);

sequelize.sync({ alter: true, force: true }).then(() => {
  console.log('Database connection established.');

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}).catch((err: Error) => {
  console.error('Error connecting to database:', err);
});
