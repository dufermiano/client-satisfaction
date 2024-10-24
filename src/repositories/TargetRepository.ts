import { Target } from '../models/Target';

export class TargetRepository {
    async create(data: Partial<Target>): Promise<Target> {
        return await Target.create(data);
    }

    async findAll(): Promise<Target[]> {
        return await Target.findAll();
    }

    async findById(id: number): Promise<Target | null> {
        return await Target.findByPk(id);
    }

    async findByName(name: string): Promise<Target | null> {
        return await Target.findOne({
            where: { name }
        });
    }

    async update(id: number, data: Partial<Target>): Promise<Target | null> {
        const target = await this.findById(id);
        if (target) {
            return await target.update(data);
        }
        return null;
    }

    async delete(id: number): Promise<void> {
        const target = await this.findById(id);
        if (target) {
            await target.destroy();
        }
    }
}