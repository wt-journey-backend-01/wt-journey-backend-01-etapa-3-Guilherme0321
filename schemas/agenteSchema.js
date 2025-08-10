"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agenteSchema = void 0;
const zod_1 = require("zod");
exports.agenteSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1, { error: "O nome é obrigatório." }),
    dataDeIncorporacao: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "A data de incorporação deve estar no formato YYYY-MM-DD."
    }).transform(str => new Date(str)),
    cargo: zod_1.z.string().min(1, { error: "O cargo é obrigatório." })
});
exports.default = exports.agenteSchema;
