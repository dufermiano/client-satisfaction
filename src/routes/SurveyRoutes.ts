import { Router, Request, Response, NextFunction } from 'express';
import { SurveyController } from '../controllers/SurveyController';
import asyncHandler from 'express-async-handler';

const router = Router();
const surveyController = new SurveyController();

router.post('/', asyncHandler((req: Request, res: Response) => surveyController.create(req, res)));
router.get('/', asyncHandler((req: Request, res: Response) => surveyController.getAll(req, res)));
router.get('/:id', asyncHandler((req: Request, res: Response, next: NextFunction) => surveyController.getById(req, res, next)));
router.put('/:id', asyncHandler((req: Request, res: Response, next: NextFunction) => surveyController.update(req, res, next)));
router.delete('/:id', asyncHandler((req: Request, res: Response, next: NextFunction) => surveyController.delete(req, res, next)));

export default router;
