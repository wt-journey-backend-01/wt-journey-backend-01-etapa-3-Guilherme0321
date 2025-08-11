"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAgentes = getAllAgentes;
exports.getAgenteById = getAgenteById;
exports.getCasosByAgenteId = getCasosByAgenteId;
exports.createAgente = createAgente;
exports.updateAgente = updateAgente;
exports.partialUpdateAgente = partialUpdateAgente;
exports.deleteAgente = deleteAgente;
const agentesRepository = __importStar(require("../repositories/agentesRepository"));
const agenteSchema_1 = __importDefault(require("../schemas/agenteSchema"));
async function getAllAgentes(req, res, next) {
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
        const agentes = await agentesRepository.findAll(cargo, sort);
        res.json(agentes);
    }
    catch (error) {
        next(error);
    }
}
async function getAgenteById(req, res, next) {
    try {
        const { id } = req.params;
        const agente = await agentesRepository.findById(id);
        if (!agente) {
            return res.status(404).json({ error: "Agente não encontrado." });
        }
        return res.json(agente);
    }
    catch (error) {
        next(error);
    }
}
async function getCasosByAgenteId(req, res, next) {
    try {
        const { id } = req.params;
        const casos = await agentesRepository.findCasosByAgenteId(id);
        return res.json(casos);
    }
    catch (error) {
        next(error);
    }
}
async function createAgente(req, res, next) {
    try {
        const validatedAgente = agenteSchema_1.default.parse(req.body);
        const newAgente = await agentesRepository.create(validatedAgente);
        return res.status(201).json(newAgente);
    }
    catch (error) {
        next(error);
    }
}
async function updateAgente(req, res, next) {
    try {
        const { id } = req.params;
        const validatedAgente = agenteSchema_1.default.parse(req.body);
        const updatedAgente = await agentesRepository.update(id, validatedAgente);
        if (!updatedAgente) {
            return res.status(404).json({ error: "Agente não encontrado." });
        }
        return res.json(updatedAgente);
    }
    catch (error) {
        next(error);
    }
}
async function partialUpdateAgente(req, res, next) {
    try {
        const { id } = req.params;
        const validatedPartialAgente = agenteSchema_1.default.partial().parse(req.body);
        const updatedAgente = await agentesRepository.partialUpdateAgente(id, validatedPartialAgente);
        if (!updatedAgente) {
            return res.status(404).json({ error: "Agente não encontrado." });
        }
        return res.json(updatedAgente);
    }
    catch (error) {
        next(error);
    }
}
async function deleteAgente(req, res, next) {
    try {
        const { id } = req.params;
        const deleted = await agentesRepository.deleteAgente(id);
        if (!deleted) {
            return res.status(404).json({ error: "Agente não encontrado." });
        }
        return res.status(204).send();
    }
    catch (error) {
        next(error);
    }
}
