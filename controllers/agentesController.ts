import { NextFunction, Request, Response } from 'express';
import * as agentesRepository from "../repositories/agentesRepository";
import agenteSchema from '../schemas/agenteSchema';

export async function getAllAgentes(req: Request, res: Response, next: NextFunction) {
    try {
        const { cargo, sort } = req.query;
        
        // Validar cargo se fornecido
        if (cargo && typeof cargo !== 'string') {
            return res.status(400).json({ error: "Parâmetro 'cargo' deve ser uma string." });
        }
        
        // Validar sort se fornecido
        if (sort && typeof sort !== 'string') {
            return res.status(400).json({ error: "Parâmetro 'sort' deve ser uma string." });
        }
        
        // Validar valores de sort permitidos
        if (sort && !['dataDeIncorporacao', '-dataDeIncorporacao'].includes(sort)) {
            return res.status(400).json({ 
                error: "Parâmetro 'sort' deve ser 'dataDeIncorporacao' ou '-dataDeIncorporacao'." 
            });
        }
        
        const agentes = await agentesRepository.findAll(cargo as string, sort as string);
        res.json(agentes);
    } catch (error) {
        next(error);
    }
}

export async function getAgenteById(req: Request, res: Response, next: NextFunction) {
    try{
        const { id } = req.params;
        const agente = await agentesRepository.findById(id);
        if (!agente) {
            return res.status(404).json({ error: "Agente não encontrado." });
        }
        return res.json(agente);
    } catch (error) {
        next(error);
    }
}

export async function getCasosByAgenteId(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        
        const casos = await agentesRepository.findCasosByAgenteId(id);
        
        return res.json(casos);
    } catch (error) {
        next(error);
    }
}

export async function createAgente(req: Request, res: Response, next: NextFunction) {
    try {
        const validatedAgente = agenteSchema.parse(req.body);
        const newAgente = await agentesRepository.create(validatedAgente);
        return res.status(201).json(newAgente);
    } catch (error) {
        next(error);
    }
}

export async function updateAgente(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const validatedAgente = agenteSchema.parse(req.body);
        const updatedAgente = await agentesRepository.update(id, validatedAgente);
        if (!updatedAgente) {
            return res.status(404).json({ error: "Agente não encontrado." });
        }
        return res.json(updatedAgente);
    } catch (error) {
        next(error);
    }
}

export async function partialUpdateAgente(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const validatedPartialAgente = agenteSchema.partial().parse(req.body);
        const updatedAgente = await agentesRepository.partialUpdateAgente(id, validatedPartialAgente);
        if (!updatedAgente) {
            return res.status(404).json({ error: "Agente não encontrado." });
        }
        return res.json(updatedAgente);       
    } catch (error) {
        next(error);
    }
}

export async function deleteAgente(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const deleted = await agentesRepository.deleteAgente(id);
        if (!deleted) {
            return res.status(404).json({ error: "Agente não encontrado." });
        }
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
}