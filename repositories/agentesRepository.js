"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = findAll;
exports.findById = findById;
exports.findCasosByAgenteId = findCasosByAgenteId;
exports.create = create;
exports.update = update;
exports.partialUpdateAgente = partialUpdateAgente;
exports.deleteAgente = deleteAgente;
const db_1 = __importDefault(require("../db/db"));
async function findAll(cargo, sort) {
    let query = (0, db_1.default)('agentes').select('*');
    if (cargo) {
        query = query.where('cargo', cargo);
    }
    if (sort === 'dataDeIncorporacao') {
        query = query.orderBy('dataDeIncorporacao', 'asc');
    }
    else if (sort === '-dataDeIncorporacao') {
        query = query.orderBy('dataDeIncorporacao', 'desc');
    }
    return await query;
}
async function findById(id) {
    return await (0, db_1.default)('agentes').where('id', id).first();
}
async function findCasosByAgenteId(id) {
    try {
        return await (0, db_1.default)('casos')
            .where('agente_id', id)
            .select('id', 'titulo', 'descricao', 'status', 'agente_id');
    }
    catch (error) {
        console.error("Error fetching casos by agente ID:", error);
        return undefined;
    }
}
async function create(agente) {
    return await (0, db_1.default)('agentes').insert(agente).returning('*').then(rows => rows[0]);
}
async function update(id, updatedAgente) {
    return await (0, db_1.default)('agentes').where('id', id).update(updatedAgente).returning('*').then(rows => rows[0]);
}
async function partialUpdateAgente(id, updatedAgente) {
    return await (0, db_1.default)('agentes').where('id', id).update(updatedAgente).returning('*').then(rows => rows[0]);
}
async function deleteAgente(id) {
    return await (0, db_1.default)('agentes').where('id', id).del().then(count => count > 0);
}
