import { Router, Request, Response } from 'express';
import { AnswerController } from '../controllers/AnswerController';

const router = Router();
const answerController = new AnswerController();

router.post('/', (req: Request, res: Response) => answerController.create(req, res));
router.get('/by-target', (req: Request, res: Response) => answerController.listByTarget(req, res));
router.get('/:survey_id', (req: Request, res: Response) => answerController.findBySurveyId(req, res));
router.put('/:id', (req: Request, res: Response) => answerController.update(req, res));

export default router;
