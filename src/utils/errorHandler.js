"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const errorHandler = (err, req, res, next) => {
    if (err instanceof zod_1.ZodError) {
        const errors = {};
        err.issues.forEach(issue => {
            const field = issue.path.join('.') || 'general';
            errors[field] = issue.message;
        });
        return res.status(400).json({
            status: 400,
            message: 'Parâmetros inválidos',
            errors: errors
        });
    }
    return res.status(500).json({
        status: 500,
        message: 'Erro interno do servidor',
        error: err.message || 'Ocorreu um erro inesperado.'
    });
};
exports.errorHandler = errorHandler;
