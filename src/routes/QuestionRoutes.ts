import { Router, Request, Response } from 'express';
import { QuestionController } from '../controllers/QuestionController';
import asyncHandler from 'express-async-handler';

const router = Router();
const questionController = new QuestionController();

router.post('/', asyncHandler((req: Request, res: Response) => questionController.create(req, res)));
router.get('/', asyncHandler((req: Request, res: Response) => questionController.getAll(req, res)));
router.get('/:id', asyncHandler((req: Request, res: Response) => questionController.getById(req, res)));
router.put('/:id', asyncHandler((req: Request, res: Response) => questionController.update(req, res)));
router.delete('/:id', asyncHandler((req: Request, res: Response) => questionController.delete(req, res)));

export default router;
