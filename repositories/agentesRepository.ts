import db from "../db/db";
import { AgentePayload } from "../schemas/agenteSchema";

export async function findAll(cargo?: string, sort?: string): Promise<AgentePayload[]> {
    let query = db('agentes').select('*');

    if (cargo) {
        query = query.where('cargo', cargo);
    }

    if (sort === 'dataDeIncorporacao') {
        query = query.orderBy('dataDeIncorporacao', 'asc');
    } else if (sort === '-dataDeIncorporacao') {
        query = query.orderBy('dataDeIncorporacao', 'desc');
    }

    return await query;
}

export async function findById(id: string): Promise<AgentePayload | undefined> {
    return await db('agentes').where('id', id).first();
}

export async function findCasosByAgenteId(id: string): Promise<any[] | undefined> {
    try {
        return await db('casos')
            .where('agente_id', id)
            .select('id', 'titulo', 'descricao', 'status', 'agente_id');
    } catch (error) {
        console.error("Error fetching casos by agente ID:", error);
        return undefined;
    }
}

export async function create(agente: AgentePayload): Promise<AgentePayload> {
    return await db('agentes').insert(agente).returning('*').then(rows => rows[0]);
}

export async function update(id: string, updatedAgente: AgentePayload): Promise<AgentePayload | undefined> {
    return await db('agentes').where('id', id).update(updatedAgente).returning('*').then(rows => rows[0]);
}

export async function partialUpdateAgente(id: string, updatedAgente: Partial<AgentePayload>): Promise<AgentePayload | undefined> {
    return await db('agentes').where('id', id).update(updatedAgente).returning('*').then(rows => rows[0]);
}

export async function deleteAgente(id: string): Promise<boolean> {
    return await db('agentes').where('id', id).del().then(count => count > 0);
}
