"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specs = exports.swaggerUi = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
exports.swaggerUi = swagger_ui_express_1.default;
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API do Departamento de Polícia',
            version: '1.0.0',
            description: 'API para gerenciamento de agentes e casos do Departamento de Polícia',
            contact: {
                name: 'Suporte da API',
                email: 'suporte@departamentopolicia.gov.br'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desenvolvimento'
            }
        ],
        tags: [
            {
                name: 'Agentes',
                description: 'Operações relacionadas aos agentes do departamento de polícia'
            },
            {
                name: 'Casos',
                description: 'Operações relacionadas aos casos policiais'
            }
        ],
        components: {
            schemas: {
                Agente: {
                    type: 'object',
                    required: ['id', 'nome', 'dataDeIncorporacao', 'cargo'],
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Identificador único do agente',
                            example: '123e4567-e89b-12d3-a456-426614174000'
                        },
                        nome: {
                            type: 'string',
                            description: 'Nome completo do agente',
                            example: 'João Silva'
                        },
                        dataDeIncorporacao: {
                            type: 'string',
                            format: 'date',
                            description: 'Data de incorporação do agente (YYYY-MM-DD)',
                            example: '2020-01-15'
                        },
                        cargo: {
                            type: 'string',
                            description: 'Cargo do agente',
                            example: 'Delegado'
                        }
                    }
                },
                Caso: {
                    type: 'object',
                    required: ['id', 'titulo', 'descricao', 'status', 'agente_id'],
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Identificador único do caso',
                            example: '456e7890-e89b-12d3-a456-426614174111'
                        },
                        titulo: {
                            type: 'string',
                            description: 'Título do caso',
                            example: 'Roubo na Rua Principal'
                        },
                        descricao: {
                            type: 'string',
                            description: 'Descrição detalhada do caso',
                            example: 'Roubo de veículo ocorrido na Rua Principal às 14h30'
                        },
                        status: {
                            type: 'string',
                            enum: ['aberto', 'solucionado'],
                            description: 'Status atual do caso',
                            example: 'aberto'
                        },
                        agente_id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID do agente responsável pelo caso',
                            example: '123e4567-e89b-12d3-a456-426614174000'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                            description: 'Mensagem de erro',
                            example: 'Agente não encontrado'
                        }
                    }
                }
            },
            responses: {
                NotFound: {
                    description: 'Recurso não encontrado',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                },
                BadRequest: {
                    description: 'Dados inválidos fornecidos',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                },
                InternalServerError: {
                    description: 'Erro interno do servidor',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.ts', './controllers/*.ts'] // Arquivos onde estão as anotações JSDoc
};
const specs = (0, swagger_jsdoc_1.default)(options);
exports.specs = specs;
