import { Router, Request, Response } from 'express';
import { SurveyController } from '../controllers/SurveyController';

const router = Router();
const surveyController = new SurveyController();

router.post('/', (req: Request, res: Response) => surveyController.create(req, res));
router.get('/', (req: Request, res: Response) => surveyController.getAll(req, res));
router.get('/:id', (req: Request, res: Response) => surveyController.getById(req, res));
router.put('/:id', (req: Request, res: Response) => surveyController.update(req, res));
router.delete('/:id', (req: Request, res: Response) => surveyController.delete(req, res));

export default router;
