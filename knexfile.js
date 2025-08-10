"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Update with your config settings.
const config = {
    development: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            port: 5433,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
        },
        migrations: {
            directory: './src/db/migrations',
        },
        seeds: {
            directory: './src/db/seeds',
        },
    },
    ci: {
        client: 'pg',
        connection: {
            host: 'postgres',
            port: 5433,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
        },
        migrations: {
            directory: './src/db/migrations',
        },
        seeds: {
            directory: './src/db/seeds',
        },
    }
};
exports.default = config;
