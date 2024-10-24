import { Router, Request, Response, NextFunction } from 'express';
import { TargetController } from '../controllers/TargetController';
import asyncHandler from 'express-async-handler';

const router = Router();
const targetController = new TargetController();

router.post('/', asyncHandler((req: Request, res: Response, next: NextFunction) => targetController.create(req, res, next)));
router.get('/', asyncHandler((req: Request, res: Response) => targetController.getAll(req, res)));
router.get('/:id', asyncHandler((req: Request, res: Response, next: NextFunction) => targetController.getById(req, res, next)));
router.put('/:id', asyncHandler((req: Request, res: Response, next: NextFunction) => targetController.update(req, res, next)));
router.delete('/:id', asyncHandler((req: Request, res: Response, next: NextFunction) => targetController.delete(req, res, next)));

export default router;
