import { Router } from 'express';
import * as casosController from '../controllers/casosController';

const casosRouter = Router();

/**
 * @swagger
 * /casos:
 *   get:
 *     summary: Listar todos os casos
 *     tags: [Casos]
 *     description: Retorna uma lista com todos os casos cadastrados no sistema
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [aberto, solucionado]
 *         description: Filtrar por status do caso
 *       - in: query
 *         name: agente_id
 *         schema:
 *           type: string
 *         description: Filtrar por ID do agente responsável
 *     responses:
 *       200:
 *         description: Lista de casos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Caso'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
casosRouter.get('/casos', casosController.getAllCasos);

/**
 * @swagger
 * /casos/search:
 *   get:
 *     summary: Buscar casos por critérios
 *     tags: [Casos]
 *     description: Busca casos baseado em parâmetros de consulta
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Filtrar por título do caso
 *     responses:
 *       200:
 *         description: Casos encontrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Caso'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
casosRouter.get('/casos/search', casosController.searchCasos);

/**
 * @swagger
 * /casos/{id}:
 *   get:
 *     summary: Buscar caso por ID
 *     tags: [Casos]
 *     description: Retorna um caso específico pelo seu ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único do caso
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Caso encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caso'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
casosRouter.get('/casos/:id', casosController.getCasoById);

/**
 * @swagger
 * /casos/{id}/agente:
 *   get:
 *     summary: Buscar agente responsável por um caso
 *     tags: [Casos]
 *     description: Retorna as informações do agente responsável por um caso específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único do caso
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
casosRouter.get('/casos/:id/agente', casosController.getAgenteByCasoId);

/**
 * @swagger
 * /casos:
 *   post:
 *     summary: Criar um novo caso
 *     tags: [Casos]
 *     description: Cria um novo caso no sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Caso'
 *     responses:
 *       201:
 *         description: Caso criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caso'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
casosRouter.post('/casos', casosController.createCaso);

/**
 * @swagger
 * /casos/{id}:
 *   put:
 *     summary: Atualizar caso completamente
 *     tags: [Casos]
 *     description: Atualiza todos os campos de um caso específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único do caso
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Caso'
 *     responses:
 *       200:
 *         description: Caso atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caso'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
casosRouter.put('/casos/:id', casosController.updateCaso);

/**
 * @swagger
 * /casos/{id}:
 *   patch:
 *     summary: Atualizar caso parcialmente
 *     tags: [Casos]
 *     description: Atualiza campos específicos de um caso
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único do caso
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título do caso
 *               descricao:
 *                 type: string
 *                 description: Descrição detalhada do caso
 *               status:
 *                 type: string
 *                 enum: [aberto, solucionado]
 *                 description: Status atual do caso
 *               agente_id:
 *                 type: string
 *                 description: ID do agente responsável pelo caso
 *     responses:
 *       200:
 *         description: Caso atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caso'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
casosRouter.patch('/casos/:id', casosController.partialUpdateCaso);

/**
 * @swagger
 * /casos/{id}:
 *   delete:
 *     summary: Deletar caso
 *     tags: [Casos]
 *     description: Remove um caso do sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único do caso
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Caso deletado com sucesso
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
casosRouter.delete('/casos/:id', casosController.deleteCaso);

export default casosRouter;