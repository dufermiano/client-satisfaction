import { NextFunction, Request, Response } from 'express';
import { TargetRepository } from '../repositories/TargetRepository';
import { targetSchema, getOrDeleteByIdSchema, updateTargetSchema } from '../validators/Target';
import { CustomError } from '../middlewares/errorMiddleware';

export class TargetController {
    private targetRepository: TargetRepository;

    constructor() {
        this.targetRepository = new TargetRepository();
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { name } = targetSchema.parse(req.body);
        const lowerCaseName = name.toLowerCase();

        try {
            const hastarget = await this.targetRepository.findByName(lowerCaseName);

            if (hastarget) {
                next(new CustomError(409, 'Target already exists'));
                return;
            }

            const target = await this.targetRepository.create({ name: lowerCaseName });
            res.status(201).json(target);
        } catch (error) {
            throw new CustomError(500, 'Failed to create target', error as any);
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const targets = await this.targetRepository.findAll();
            res.status(200).json(targets);
        } catch (error) {
            throw new CustomError(500, 'Failed to fetch targets', error as any);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = getOrDeleteByIdSchema.parse({ ...req.params });

        try {
            const target = await this.targetRepository.findById(parseInt(id));
            if (!target) {
                next(new CustomError(404, 'Target not found'));
                return;
            }

            res.status(200).json(target);
        } catch (error) {
            throw new CustomError(500, 'Failed to fetch target', error as any);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id, name } = updateTargetSchema.parse({ ...req.params, ...req.body });
        try {
            const target = await this.targetRepository.update(parseInt(id), { name });
            if (!target) {
                next(new CustomError(404, 'Target not found'));
                return;
            }

            res.status(200).json(target);
        } catch (error) {
            throw new CustomError(500, 'Failed to update target', error as any);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = getOrDeleteByIdSchema.parse({ ...req.params });

        try {
            const target = await this.targetRepository.findById(parseInt(id));
            if (!target) {
                next(new CustomError(404, 'Target not found'));
                return;
            }
            await this.targetRepository.delete(parseInt(id));
            res.status(204).send();
        } catch (error) {
            throw new CustomError(500, 'Failed to delete Target', error as any);
        }
    }
}
