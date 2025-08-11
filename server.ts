import express, { Express } from 'express';
import agentesRouter from './routes/agentesRoutes';
import casosRouter from './routes/casosRoutes';
import { errorHandler } from './utils/errorHandler';
import { swaggerUi, specs } from './docs/swagger';

const app: Express = express();
const PORT: number = 3000;

app.use(express.json());

// Swagger Documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(agentesRouter);
app.use(casosRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em localhost:${PORT}`);
});
