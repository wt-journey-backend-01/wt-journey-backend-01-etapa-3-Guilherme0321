import { NextFunction, Request, Response } from 'express';
import * as casosRepository from "../repositories/casosRepository";
import * as agentesRepository from "../repositories/agentesRepository";
import casoSchema from '../schemas/casoSchema';

export async function getAllCasos(req: Request, res: Response, next: NextFunction) {
    try {
        const { agente_id, status } = req.query;
        
        // Validar agente_id se fornecido
        if (agente_id && typeof agente_id !== 'string') {
            return res.status(400).json({ error: "Parâmetro 'agente_id' deve ser uma string UUID." });
        }
        
        // Validar status se fornecido
        if (status && typeof status !== 'string') {
            return res.status(400).json({ error: "Parâmetro 'status' deve ser uma string." });
        }
        
        // Validar valores de status permitidos
        if (status && !['aberto', 'solucionado'].includes(status)) {
            return res.status(400).json({ 
                error: "Parâmetro 'status' deve ser 'aberto' ou 'solucionado'." 
            });
        }
        
        const casos = await casosRepository.findAll(agente_id as string, status as string);
        res.json(casos);
    } catch (error) {
        next(error);
    }
}

export async function getCasoById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const caso = await casosRepository.findById(id);
        if (!caso) {
            return res.status(404).json({error: "Caso não encontrado."});
        }
        return res.json(caso);
    } catch (error) {
        next(error);
    }
}

export async function getAgenteByCasoId(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const caso = await casosRepository.findById(id);
        if (!caso) {
            return res.status(404).json({error: "Caso não encontrado."});
        }

        const agente = await agentesRepository.findById(caso.agente_id);
        if (!agente) {

            return res.status(404).json({error: "Agente não encontrado."});
        }

        return res.json(agente);
    } catch (error) {
        next(error);
    }
}

export async function searchCasos(req: Request, res: Response, next: NextFunction) {
    try {
        const { q } = req.query;
        
        if(!q || typeof q !== 'string') {
            return res.status(400).json({error: "Query string inválida."});
        }
        const casos = await casosRepository.searchCasos(q);
        return res.json(casos);
    } catch (error) {
        next(error);
    }
}

export async function createCaso(req: Request, res: Response, next: NextFunction) {
    try {
        const validatedCase = casoSchema.parse(req.body);
        const newCase = await casosRepository.create(validatedCase);
        return res.status(201).json(newCase);
    } catch (error) {
        next(error)
    }
}

export async function updateCaso(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const validatedCase = casoSchema.parse(req.body);
        const updatedCase = await casosRepository.update(id, validatedCase);
        if (!updatedCase) {
            return res.status(404).json({error: "Caso não encontrado."});
        }
        return res.json(updatedCase);
    } catch (error) {
        next(error);
    }
}

export async function partialUpdateCaso(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const validatedPartialCaso = casoSchema.partial().parse(req.body);
        const updatedCase = await casosRepository.partialUpdateCaso(id, validatedPartialCaso);
        if (!updatedCase) {
            return res.status(404).json({error: "Caso não encontrado."});
        }
        return res.json(updatedCase);
    } catch (error) {
        next(error);
    }
}

export async function deleteCaso(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const deleted = await casosRepository.deleteCaso(id);
        if (!deleted) {
            return res.status(404).json({error: "Caso não encontrado."});
        }
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
}
