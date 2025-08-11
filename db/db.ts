import config from '../knexfile';
import knex from "knex";

const nodeEnv = process.env.NODE_ENV || 'development';
const db = knex(config[nodeEnv]);

export default db;
