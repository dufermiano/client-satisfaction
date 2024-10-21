import { Router, Request, Response, NextFunction } from 'express';
import { QuestionController } from '../controllers/QuestionController';
import asyncHandler from 'express-async-handler';

const router = Router();
const questionController = new QuestionController();

router.post('/', asyncHandler((req: Request, res: Response, next: NextFunction) => questionController.create(req, res)));
router.get('/', asyncHandler((req: Request, res: Response) => questionController.getAll(req, res)));
router.get('/:id', asyncHandler((req: Request, res: Response, next: NextFunction) => questionController.getById(req, res, next)));
router.get('/survey/:survey_id', asyncHandler((req: Request, res: Response) => questionController.getBySurveyId(req, res)));
router.put('/:id', asyncHandler((req: Request, res: Response, next: NextFunction) => questionController.update(req, res, next)));
router.delete('/:id', asyncHandler((req: Request, res: Response, next: NextFunction) => questionController.delete(req, res, next)));

export default router;
