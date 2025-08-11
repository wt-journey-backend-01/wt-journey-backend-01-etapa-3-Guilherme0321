"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
async function seed(knex) {
    // Deletes ALL existing entries
    await knex("casos").del();
    // Inserts seed entries
    await knex("casos").insert([
        { id: 1, titulo: "Caso 1", descricao: "Descrição do Caso 1", status: "aberto", agente_id: 1 },
        { id: 2, titulo: "Caso 2", descricao: "Descrição do Caso 2", status: "solucionado", agente_id: 2 },
        { id: 3, titulo: "Caso 3", descricao: "Descrição do Caso 3", status: "aberto", agente_id: 3 }
    ]);
}
;
