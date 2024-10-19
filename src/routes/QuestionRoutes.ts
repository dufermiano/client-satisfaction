import { Router, Request, Response } from 'express';
import { QuestionController } from '../controllers/QuestionController';

const router = Router();
const questionController = new QuestionController();

router.post('/', (req: Request, res: Response) => questionController.create(req, res));
router.get('/', (req: Request, res: Response) => questionController.getAll(req, res));
router.get('/:id', (req: Request, res: Response) => questionController.getById(req, res));
router.put('/:id', (req: Request, res: Response) => questionController.update(req, res));
router.delete('/:id', (req: Request, res: Response) => questionController.delete(req, res));

export default router;
