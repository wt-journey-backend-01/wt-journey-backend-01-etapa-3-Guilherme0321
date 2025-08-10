# 🚀 Instruções de Configuração - API Departamento de Polícia

## 📋 Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **Docker** e **Docker Compose**
- **Git**

## 🐳 1. Subir o Banco de Dados com Docker

### Iniciar o container PostgreSQL:
```bash
docker-compose up -d
```

### Verificar se o container está rodando:
```bash
docker ps
```
Você deve ver o container `postgres_db` na lista.

### Verificar logs do banco (se necessário):
```bash
docker-compose logs db
```

### Parar o banco (quando necessário):
```bash
docker-compose down
```

---

## 📦 2. Instalação das Dependências

```bash
npm install
```

---

## 🔧 3. Configuração do Ambiente

### Criar arquivo `.env` na raiz do projeto:
```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=policia_db
PORT=3000
```

---

## 🗃️ 4. Executar Migrations

### Executar todas as migrations:
```bash
npx knex migrate:latest
```

### Verificar status das migrations:
```bash
npx knex migrate:status
```

### Reverter última migration (se necessário):
```bash
npx knex migrate:rollback
```

### Reverter todas as migrations (se necessário):
```bash
npx knex migrate:rollback --all
```

---

## 🌱 5. Rodar Seeds (Popular Banco com Dados)

### Executar todos os seeds:
```bash
npx knex seed:run
```

---

## 🚦 6. Executar a Aplicação

### Modo desenvolvimento (com hot reload):
```bash
npm run dev
```

### Modo produção:
```bash
npm run build
npm start
```

A API estará disponível em: `http://localhost:3000`

---

## 📚 7. Documentação da API

Com a aplicação rodando, acesse a documentação Swagger em:
`http://localhost:3000/api-docs`

---

## 🔍 8. Scripts NPM para Banco de Dados

### Scripts disponíveis:
```bash
# Subir o banco
npm run db:up

# Parar o banco
npm run db:down

# Reset completo do banco (recomendado)
npm run db:reset

# Executar apenas migrations
npm run db:migrate

# Reverter última migration
npm run db:rollback

# Executar apenas seeds
npm run db:seed
```

### ⚡ Script Automático - Reset Completo:
```bash
npm run db:reset
```
**Este comando faz tudo automaticamente:**
1. Para e remove containers (com volumes)
2. Sobe o banco novamente
3. Aguarda 10 segundos para o banco inicializar
4. Executa todas as migrations
5. Popula com dados de exemplo (seeds)

---

## 🔧 9. Comandos Úteis

### Verificar se o banco está acessível:
```bash
docker exec -it postgres_db psql -U postgres -d policia_db -c "\dt"
```

### Executar query diretamente no banco:
```bash
docker exec -it postgres_db psql -U postgres -d policia_db
```

### Limpar volumes do Docker (⚠️ Remove todos os dados):
```bash
docker-compose down -v
```

---

## 🛠️ 9. Troubleshooting

### Problema: Porta 5433 já está em uso
```bash
# Verificar o que está usando a porta
netstat -ano | findstr :5433

# Parar o processo ou mudar a porta no docker-compose.yml
```

### Problema: Erro de conexão com o banco
1. Verificar se o container está rodando: `docker ps`
2. Verificar logs: `docker-compose logs db`
3. Aguardar o healthcheck passar (pode levar até 30s)

### Problema: Migration não executa
1. Verificar se o banco está rodando
2. Verificar variáveis de ambiente no `.env`
3. Verificar configuração no `knexfile.ts`

---

## 📝 11. Estrutura de Comandos Completa

### ⚡ Setup inicial SUPER RÁPIDO (RECOMENDADO):
```bash
# 1. Instalar dependências
npm install

# 2. Reset completo automático do banco
npm run db:reset

# 3. Executar a aplicação
npm run dev
```

### Setup inicial detalhado (alternativa):
```bash
# 1. Subir o banco
npm run db:up

# 2. Instalar dependências
npm install

# 3. Executar migrations
npm run db:migrate

# 4. Popular com dados de exemplo
npm run db:seed

# 5. Executar a aplicação
npm run dev
```

### Reset completo do banco (quando necessário):
```bash
# Opção 1: Automática (RECOMENDADO)
npm run db:reset

# Opção 2: Manual
npm run db:down
docker volume prune -f
npm run db:up
# Aguardar 10 segundos
npm run db:migrate
npm run db:seed
```

---

## 🎯 Endpoints Principais

- **GET** `/agentes` - Listar agentes
- **GET** `/agentes/:id` - Buscar agente por ID
- **POST** `/agentes` - Criar novo agente
- **PUT** `/agentes/:id` - Atualizar agente
- **DELETE** `/agentes/:id` - Deletar agente

- **GET** `/casos` - Listar casos
- **GET** `/casos/:id` - Buscar caso por ID
- **POST** `/casos` - Criar novo caso
- **PUT** `/casos/:id` - Atualizar caso
- **DELETE** `/casos/:id` - Deletar caso

Consulte a documentação Swagger para detalhes completos da API.
