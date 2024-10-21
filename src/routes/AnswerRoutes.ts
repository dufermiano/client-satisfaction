import { Router, Request, Response } from 'express';
import { AnswerController } from '../controllers/AnswerController';
import asyncHandler from 'express-async-handler';

const router = Router();
const answerController = new AnswerController();

router.post('/', asyncHandler((req: Request, res: Response) => answerController.create(req, res)));
router.get('/by-target', asyncHandler((req: Request, res: Response) => answerController.listByTarget(req, res)));
router.get('/:survey_id', asyncHandler((req: Request, res: Response) => answerController.findBySurveyId(req, res)));
router.put('/:id', asyncHandler((req: Request, res: Response) => answerController.update(req, res)));

export default router;
