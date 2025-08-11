"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.createTable('agentes', (table) => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.date('dataDeIncorporacao').notNullable();
        table.string('cargo').notNullable();
    });
    await knex.schema.createTable('casos', (table) => {
        table.increments('id').primary();
        table.string('titulo').notNullable();
        table.string('descricao').notNullable();
        table.enu('status', ['aberto', 'solucionado']).defaultTo('aberto');
        table.integer('agente_id').unsigned().references('id').inTable('agentes').onDelete('CASCADE');
    });
}
async function down(knex) {
    await knex.schema.dropTableIfExists('casos');
    await knex.schema.dropTableIfExists('agentes');
}
