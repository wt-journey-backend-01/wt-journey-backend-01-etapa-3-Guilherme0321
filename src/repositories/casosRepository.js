"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = findAll;
exports.findById = findById;
exports.searchCasos = searchCasos;
exports.create = create;
exports.update = update;
exports.partialUpdateCaso = partialUpdateCaso;
exports.deleteCaso = deleteCaso;
const db_1 = __importDefault(require("../db/db"));
async function findAll(agente_id, status) {
    return await (0, db_1.default)('casos').where(function () {
        if (agente_id) {
            this.where('agente_id', agente_id);
        }
    }).where(function () {
        if (status) {
            this.where('status', status);
        }
    });
}
async function findById(id) {
    return await (0, db_1.default)('casos').where('id', id).first();
}
async function searchCasos(query) {
    return await (0, db_1.default)('casos').where('titulo', 'like', `%${query}%`)
        .orWhere('descricao', 'like', `%${query}%`);
}
async function create(caso) {
    return await (0, db_1.default)('casos').insert(caso).returning('*').then(rows => rows[0]);
}
async function update(id, updatedCaso) {
    return await (0, db_1.default)('casos').where('id', id).update(updatedCaso).returning('*').then(rows => rows[0]);
}
async function partialUpdateCaso(id, updatedCaso) {
    return await (0, db_1.default)('casos').where('id', id).update(updatedCaso).returning('*').then(rows => rows[0]);
}
async function deleteCaso(id) {
    return await (0, db_1.default)('casos').where('id', id).del().then(count => count > 0);
}
