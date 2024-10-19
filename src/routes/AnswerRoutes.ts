import { Router, Request, Response } from 'express';
import { AnswerController } from '../controllers/AnswerController';

const router = Router();
const answerController = new AnswerController();

router.post('/', (req: Request, res: Response) => answerController.create(req, res));
router.get('/', (req: Request, res: Response) => answerController.getAll(req, res));
router.get('/:id', (req: Request, res: Response) => answerController.getById(req, res));
router.put('/:id', (req: Request, res: Response) => answerController.update(req, res));
router.delete('/:id', (req: Request, res: Response) => answerController.delete(req, res));

export default router;
