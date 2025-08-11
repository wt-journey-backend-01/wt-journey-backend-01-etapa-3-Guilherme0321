import { z } from 'zod';

export const agenteSchema = z.object({
    nome: z.string().min(1, { error: "O nome é obrigatório." }),
    dataDeIncorporacao: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { 
        message: "A data de incorporação deve estar no formato YYYY-MM-DD." 
    }).transform(str => new Date(str)),
    cargo: z.string().min(1, { error: "O cargo é obrigatório." })
});

export type AgentePayload = z.infer<typeof agenteSchema>;

export default agenteSchema;