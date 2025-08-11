"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
async function seed(knex) {
    // Deletes ALL existing entries
    await knex("agentes").del();
    // Inserts seed entries
    await knex("agentes").insert([
        { id: 1, nome: "Agente 1", dataDeIncorporacao: new Date(), cargo: "Investigador" },
        { id: 2, nome: "Agente 2", dataDeIncorporacao: new Date(), cargo: "Delegado" },
        { id: 3, nome: "Agente 3", dataDeIncorporacao: new Date(), cargo: "Perito" }
    ]);
}
;
