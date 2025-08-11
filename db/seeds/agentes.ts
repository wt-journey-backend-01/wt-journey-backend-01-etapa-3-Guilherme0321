import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("agentes").del();
    
    // Inserts seed entries
    await knex("agentes").insert([
        { id: 1, nome: "Agente 1", dataDeIncorporacao: new Date(), cargo: "Investigador" },
        { id: 2, nome: "Agente 2", dataDeIncorporacao: new Date(), cargo: "Delegado" },
        { id: 3, nome: "Agente 3", dataDeIncorporacao: new Date(), cargo: "Perito" }
    ]);
    
};
    