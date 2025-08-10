"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.casoSchema = void 0;
const zod_1 = require("zod");
const status = ["aberto", "solucionado"];
exports.casoSchema = zod_1.z.object({
    titulo: zod_1.z.string().min(1, { error: "O título é obrigatório." }),
    descricao: zod_1.z.string().min(1, { error: "A descrição é obrigatória." }),
    status: zod_1.z.enum(status, { error: "O status deve ser 'aberto' ou 'solucionado'." }),
    agente_id: zod_1.z.uuid({ error: "O ID do agente deve ser um UUID válido." })
});
exports.default = exports.casoSchema;
