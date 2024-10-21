import { Router, Request, Response, NextFunction } from 'express';
import { AnswerController } from '../controllers/AnswerController';
import asyncHandler from 'express-async-handler';

const router = Router();
const answerController = new AnswerController();

router.post('/', asyncHandler((req: Request, res: Response, next: NextFunction) => answerController.create(req, res, next)));
router.get('/by-target', asyncHandler((req: Request, res: Response) => answerController.listByTarget(req, res)));
router.get('/:survey_id', asyncHandler((req: Request, res: Response) => answerController.findBySurveyId(req, res)));

export default router;
