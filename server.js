"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agentesRoutes_1 = __importDefault(require("./src/routes/agentesRoutes"));
const casosRoutes_1 = __importDefault(require("./src/routes/casosRoutes"));
const errorHandler_1 = require("./src/utils/errorHandler");
const swagger_1 = require("./src/docs/swagger");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
// Swagger Documentation
app.use('/docs', swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.specs));
app.use(agentesRoutes_1.default);
app.use(casosRoutes_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em localhost:${PORT}`);
});
