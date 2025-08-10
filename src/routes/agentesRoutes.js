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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agentesController = __importStar(require("../controllers/agentesController"));
const agentesRouter = (0, express_1.Router)();
/**
 * @swagger
 * /agentes:
 *   get:
 *     summary: Listar todos os agentes
 *     tags: [Agentes]
 *     description: Retorna uma lista com todos os agentes cadastrados no sistema
 *     parameters:
 *       - in: query
 *         name: cargo
 *         required: false
 *         description: "Filtrar agentes por cargo (ex: delegado, inspetor)"
 *         schema:
 *           type: string
 *       - in: query
 *         name: sort
 *         required: false
 *         description: "Ordenar por data de incorporação (dataDeIncorporacao para crescente, -dataDeIncorporacao para decrescente)"
 *         schema:
 *           type: string
 *           enum: [dataDeIncorporacao, -dataDeIncorporacao]
 *     responses:
 *       200:
 *         description: Lista de agentes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agente'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
agentesRouter.get('/agentes', agentesController.getAllAgentes);
/**
 * @swagger
 * /agentes/{id}:
 *   get:
 *     summary: Buscar agente por ID
 *     tags: [Agentes]
 *     description: Retorna um agente específico pelo seu ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único do agente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Agente encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agente'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
agentesRouter.get('/agentes/:id', agentesController.getAgenteById);
/**
 * @swagger
 * /agentes:
 *   post:
 *     summary: Criar um novo agente
 *     tags: [Agentes]
 *     description: Cria um novo agente no sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agente'
 *     responses:
 *       201:
 *         description: Agente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agente'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
agentesRouter.post('/agentes', agentesController.createAgente);
/**
 * @swagger
 * /agentes/{id}:
 *   put:
 *     summary: Atualizar agente completamente
 *     tags: [Agentes]
 *     description: Atualiza todos os campos de um agente específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único do agente
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agente'
 *     responses:
 *       200:
 *         description: Agente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agente'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
agentesRouter.put('/agentes/:id', agentesController.updateAgente);
/**
 * @swagger
 * /agentes/{id}:
 *   patch:
 *     summary: Atualizar agente parcialmente
 *     tags: [Agentes]
 *     description: Atualiza campos específicos de um agente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único do agente
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome completo do agente
 *               dataDeIncorporacao:
 *                 type: string
 *                 format: date
 *                 description: Data de incorporação do agente
 *               cargo:
 *                 type: string
 *                 description: Cargo do agente
 *     responses:
 *       200:
 *         description: Agente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agente'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
agentesRouter.patch('/agentes/:id', agentesController.partialUpdateAgente);
/**
 * @swagger
 * /agentes/{id}:
 *   delete:
 *     summary: Deletar agente
 *     tags: [Agentes]
 *     description: Remove um agente do sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único do agente
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Agente deletado com sucesso
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
agentesRouter.delete('/agentes/:id', agentesController.deleteAgente);
/**
 * @swagger
 * /agentes/{id}/casos:
 *   get:
 *     summary: Listar casos de um agente específico
 *     tags: [Agentes]
 *     description: Retorna todos os casos atribuídos a um agente específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único do agente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de casos do agente retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Caso'
 *       404:
 *         description: Agente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Agente não encontrado"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
agentesRouter.get('/agentes/:id/casos', agentesController.getCasosByAgenteId);
exports.default = agentesRouter;
