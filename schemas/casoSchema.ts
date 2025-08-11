import { z } from 'zod';

const status = ["aberto", "solucionado"];

export const casoSchema = z.object({
    titulo: z.string().min(1, { error: "O título é obrigatório." }),
    descricao: z.string().min(1, { error: "A descrição é obrigatória." }),
    status: z.enum(status, { error: "O status deve ser 'aberto' ou 'solucionado'." }),
    agente_id: z.uuid({ error: "O ID do agente deve ser um UUID válido." })
});

export type CasoPayload = z.infer<typeof casoSchema>;

export default casoSchema;