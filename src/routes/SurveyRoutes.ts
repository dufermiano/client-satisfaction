import { Router, Request, Response } from 'express';
import { SurveyController } from '../controllers/SurveyController';
import asyncHandler from 'express-async-handler';

const router = Router();
const surveyController = new SurveyController();

router.post('/', asyncHandler((req: Request, res: Response) => surveyController.create(req, res)));
router.get('/', asyncHandler((req: Request, res: Response) => surveyController.getAll(req, res)));
router.get('/:id', asyncHandler((req: Request, res: Response) => surveyController.getById(req, res)));
router.put('/:id', asyncHandler((req: Request, res: Response) => surveyController.update(req, res)));
router.delete('/:id', asyncHandler((req: Request, res: Response) => surveyController.delete(req, res)));

export default router;
