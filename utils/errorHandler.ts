import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof ZodError) {
        const errors: Record<string, string> = {};

        err.issues.forEach(issue => {
            const field = issue.path.join('.') || 'general';
            errors[field] = issue.message;
        });

        return res.status(400).json({
            status: 400,
            message: 'Parâmetros inválidos',
            errors: errors
        })
    }

    return res.status(500).json({
        status: 500,
        message: 'Erro interno do servidor',
        error: err.message || 'Ocorreu um erro inesperado.'
    });
}