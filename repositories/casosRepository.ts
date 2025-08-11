import { CasoPayload } from "../schemas/casoSchema";
import db from "../db/db";

export async function findAll(agente_id?: string, status?: string): Promise<CasoPayload[]> {
    return await db('casos').where( function () {
        if(agente_id) {
            this.where('agente_id', agente_id);
        }
    }).where(function () {
        if(status) {
            this.where('status', status);
        }
    });
}

export async function findById(id: string): Promise<CasoPayload | undefined> {
    return await db('casos').where('id', id).first();
}

export async function searchCasos(query: string): Promise<CasoPayload[]> {
    return await db('casos').where('titulo', 'like', `%${query}%`)
                    .orWhere('descricao', 'like', `%${query}%`);
}

export async function create(caso: CasoPayload): Promise<CasoPayload> {
    return await db('casos').insert(caso).returning('*').then(rows => rows[0]);
}

export async function update(id: string, updatedCaso: CasoPayload): Promise<CasoPayload | undefined> {
    return await db('casos').where('id', id).update(updatedCaso).returning('*').then(rows => rows[0]);
}

export async function partialUpdateCaso(id: string, updatedCaso: Partial<CasoPayload>): Promise<CasoPayload | undefined> {
    return await db('casos').where('id', id).update(updatedCaso).returning('*').then(rows => rows[0]);
}

export async function deleteCaso(id: string): Promise<boolean> {

    return await db('casos').where('id', id).del().then(count => count > 0);
}