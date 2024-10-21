import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export class CustomError extends Error {
    public status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;

        Object.setPrototypeOf(this, CustomError.prototype);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export const errorMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const objectError = {
        endpoint: `${req.method} ${req.path}`,
        status: err.status || 500,
        message: err.message || 'Internal Server Error'
    }

    if (err instanceof ZodError) {
        objectError.message = JSON.parse(err.message);
        objectError.status = 400;
    }

    res.status(objectError.status).json(objectError).end();
};
