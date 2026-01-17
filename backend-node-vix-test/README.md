# 🚀 API Cloud - Backend Node.js

Sistema de gerenciamento de VMs (Máquinas Virtuais) com suporte a multi-tenant (White Label).

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Executando o Projeto](#-executando-o-projeto)
- [Documentação da API (Swagger)](#-documentação-da-api-swagger)
- [Credenciais de Teste](#-credenciais-de-teste)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Endpoints Principais](#-endpoints-principais)
- [Roles e Permissões](#-roles-e-permissões)

## 🛠 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Superset tipado de JavaScript
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação via tokens
- **Swagger** - Documentação da API
- **Docker** - Containerização
- **Jest** - Framework de testes

## 📦 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Docker e Docker Compose (opcional, para rodar o banco de dados)
- PostgreSQL (se não usar Docker)

## 🔧 Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/backend-node-vix-test.git
cd backend-node-vix-test
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. **Suba o banco de dados (Docker):**
```bash
npm run db:up
```

5. **Execute as migrações do Prisma:**
```bash
npx prisma migrate dev
```

6. **Popule o banco com dados iniciais (seed):**
```bash
npx prisma db seed
```

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Servidor
PORT=3001

# Banco de Dados
DATABASE_URL="postgresql://user:password@localhost:5432/api_cloud?schema=public"

# JWT
JWT_SECRET="sua-chave-secreta-aqui"
JWT_EXPIRES_IN="7d"

# Ambiente
NODE_ENV="development"
```

## ▶️ Executando o Projeto

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

### Com Docker
```bash
npm run dc:up
```

## 📚 Documentação da API (Swagger)

A documentação interativa da API está disponível em:

### 🔗 **http://localhost:3001/docs**

A documentação Swagger inclui:
- ✅ Todos os endpoints da API
- ✅ Schemas de request/response
- ✅ Exemplos de uso
- ✅ Autenticação JWT
- ✅ Descrição de parâmetros e erros

## 🔑 Credenciais de Teste

Após rodar o seed (`npx prisma db seed`), as seguintes credenciais estarão disponíveis:

| Usuário | Email | Senha | Role |
|---------|-------|-------|------|
| **Administrador** | admin@admin.com | password | admin |
| **Gerente** | manager@test.com | password | manager |
| **Membro** | member@test.com | password | member |
| **Admin MSP Tech** | admin@msptech.com | password | admin |
| **Manager Cloud Corp** | manager@cloudcorp.com | password | manager |

> ⚠️ **Nota:** Todas as senhas de teste são `password`

### Como usar:
1. Acesse a documentação Swagger: http://localhost:3001/docs
2. Execute o endpoint `POST /api/v1/auth/login` com as credenciais acima
3. Copie o token retornado
4. Clique em "Authorize" no Swagger e cole o token


## 📁 Estrutura do Projeto

```
src/
├── auth/           # Configurações de autenticação
├── constants/      # Constantes e enums
├── controllers/    # Controllers das rotas
├── database/       # Configuração do Prisma
├── errors/         # Classes de erro customizadas
├── middlewares/    # Middlewares Express
├── models/         # DTOs e interfaces
├── routes/         # Definição das rotas
├── services/       # Regras de negócio
├── socket/         # Configuração WebSocket
├── swagger/        # Documentação Swagger
├── types/          # Tipos TypeScript
├── utils/          # Funções utilitárias
├── app.ts          # Configuração do Express
└── index.ts        # Ponto de entrada
```

## 🛣 Endpoints Principais

### 🔐 Autenticação
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/v1/auth/login` | Fazer login |
| POST | `/api/v1/auth/register` | Registrar novo usuário |

### 👤 Usuários
| Método | Endpoint | Descrição | Roles |
|--------|----------|-----------|-------|
| GET | `/api/v1/user` | Listar usuários | admin, manager |
| GET | `/api/v1/user/:id` | Buscar por ID | autenticado |
| POST | `/api/v1/user` | Criar usuário | admin, manager |
| PUT | `/api/v1/user/:id` | Atualizar usuário | admin, manager |
| DELETE | `/api/v1/user/:id` | Deletar usuário | admin |

### 🏢 Organizações (BrandMaster/MSP)
| Método | Endpoint | Descrição | Roles |
|--------|----------|-----------|-------|
| GET | `/api/v1/brand-master` | Listar organizações | autenticado |
| GET | `/api/v1/brand-master/self` | Minha organização | autenticado |
| GET | `/api/v1/brand-master/:id` | Buscar por ID | autenticado |
| POST | `/api/v1/brand-master` | Criar organização | admin, manager |
| PUT | `/api/v1/brand-master/:id` | Atualizar org. | admin, manager |
| DELETE | `/api/v1/brand-master/:id` | Deletar org. | admin |

### 💻 VMs (Máquinas Virtuais)
| Método | Endpoint | Descrição | Roles |
|--------|----------|-----------|-------|
| GET | `/api/v1/vm` | Listar VMs | autenticado |
| GET | `/api/v1/vm/:id` | Buscar por ID | autenticado |
| POST | `/api/v1/vm` | Criar VM | admin, manager |
| PUT | `/api/v1/vm/:id` | Atualizar VM | admin, manager |
| DELETE | `/api/v1/vm/:id` | Deletar VM | admin |

## 👥 Roles e Permissões

| Role | Descrição | Permissões |
|------|-----------|------------|
| **admin** | Administrador | Acesso total |
| **manager** | Gerente | CRUD de usuários e VMs |
| **member** | Membro | Somente leitura |

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Testes em modo watch
npm run test:dev
```

## 📦 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Compilar para produção |
| `npm start` | Executar build de produção |
| `npm test` | Executar testes |
| `npm run lint` | Verificar código |
| `npm run lint:fix` | Corrigir problemas de lint |
| `npm run format` | Formatar código |
| `npm run db:up` | Subir banco com Docker |
| `npm run db:down` | Parar banco Docker |
| `npm run dc:up` | Subir app com Docker |
| `npm run dc:down` | Parar app Docker |

## 🐳 Docker

### Banco de dados
```bash
npm run db:up    # Subir PostgreSQL
npm run db:down  # Parar PostgreSQL
```

### Aplicação completa
```bash
npm run dc:up    # Subir API + Banco
npm run dc:down  # Parar tudo
```

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

Desenvolvido com ❤️ para o Teste Técnico VIX
