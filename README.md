# Teste Técnico Vituax

## 📋 Sumário

- [Sobre o Teste](#sobre-o-teste)
- [IMPORTANTE: Como Entregar o Teste](#️-importante-como-entregar-o-teste)
- [Objetivos](#objetivos)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Requisitos do Sistema](#requisitos-do-sistema)
- [Stack Tecnológica](#stack-tecnológica)
- [Configuração e Instalação](#configuração-e-instalação)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Estrutura de Portas](#estrutura-de-portas)
- [Conceitos Importantes](#conceitos-importantes)
- [Permissões de Usuários](#permissões-de-usuários)
- [Credenciais de Teste](#credenciais-de-teste)
- [Fluxo de Desenvolvimento (GitFlow)](#fluxo-de-desenvolvimento-gitflow)
- [Soluções Desenvolvidas & Modificações](#-soluções-desenvolvidas--modificações)
- [Tarefas do Desafio](#tarefas-do-desafio)
  - [Configuração Inicial](#configuração-inicial)
  - [Autenticação e Autorização](#autenticação-e-autorização)
  - [Funcionalidades da Home Page](#funcionalidades-da-home-page)
  - [Criação de VM](#criação-de-vm)
  - [Gerenciamento de VMs (My VMs)](#gerenciamento-de-vms-my-vms)
  - [Cadastro de MSP](#cadastro-de-msp)
  - [Cadastro de Funcionários](#cadastro-de-funcionários)
  - [Configuração White Label](#configuração-white-label)
  - [Configuração de Perfil e Notificações](#configuração-de-perfil-e-notificações)
  - [Tarefas Opcionais/Diferenciais](#tarefas-opcionaisdiferenciais)
- [Referências Visuais](#referências-visuais)
- [Lembrete Final](#-lembrete-final)

---

## 🎯 Sobre o Teste

O objetivo deste teste técnico é avaliar sua habilidade em:

- **Seguir padrões já estabelecidos** no projeto
- **Pesquisar, compreender e aplicar** elementos existentes na arquitetura
- **Trabalhar com o código**, utilizando as bibliotecas e estruturas já implementadas

Você pode criar, instalar e utilizar outras bibliotecas, porém o **foco principal** deve ser trabalhar com o que já existe no projeto.

### 📚 Recomendações Importantes

1. **Entenda a arquitetura**: Gaste um tempo seguindo o fluxo do código, entendendo a localização dos componentes e como eles estão conectados.
2. **Explore o projeto**: Analise as funções, estilos e padrões já existentes antes de começar a implementar.
3. **Sinta-se livre para melhorar**: Você pode fazer melhorias e simplificações, desde que não fuja da proposta inicial.

---

## ⚠️ IMPORTANTE: Como Entregar o Teste

### 🔄 Fork do Repositório

**ATENÇÃO**: Você deve fazer um **fork** deste repositório para sua própria conta do GitHub.

#### Passos para começar:

1. **Faça o fork** deste repositório para sua conta pessoal do GitHub
2. **Clone o seu fork** (não o repositório original):
   ```bash
   git clone https://github.com/SEU-USUARIO/TestTecVix.git
   cd TestTecVix
   ```
3. Trabalhe no **seu repositório** seguindo o fluxo de desenvolvimento descrito neste README
4. Faça commits e pushes para o **seu repositório**

### ⚠️ ATENÇÃO: Pull Requests

> **🚨 IMPORTANTE**: Os Pull Requests devem ser feitos **APENAS NO SEU REPOSITÓRIO**, não no repositório da Vituax!

- ✅ **CORRETO**: Criar PRs de `feature/*` → `release` e `release` → `main` **no seu fork**
- ❌ **INCORRETO**: Criar PRs para o repositório original da Vituax

**Pull Requests externos para o repositório da Vituax serão automaticamente fechados pelo GitHub Actions.**

### 🔓 Repositório Público

> **📢 IMPORTANTE**: Seu repositório fork **DEVE SER PÚBLICO** para que a equipe da Vituax possa avaliar seu trabalho.

Certifique-se de que:
- [x] Seu repositório está configurado como **público** (não privado)
- [x] A equipe da Vituax consegue acessar o link sem necessidade de permissões especiais

### 📤 Entrega do Teste

Ao finalizar o teste, você deve:

1. ✅ Garantir que todo o código está commitado e enviado para o **seu repositório no GitHub**
2. ✅ Verificar se o README está atualizado com:
   - Suas principais modificações
   - As soluções que você desenvolveu
   - Credenciais de teste (se aplicável)
3. ✅ **Enviar o link do seu repositório no GitHub** para a equipe da Vituax

### 📋 Checklist de Entrega

Antes de enviar, certifique-se de que:

- [x] O código está no **seu repositório pessoal** do GitHub
- [x] O repositório está configurado como **público** (não privado)
- [x] A branch `main` contém o projeto original
- [x] A branch `release` contém todas as suas modificações
- [x] Existe um Pull Request da `release` para a `main` **no seu repositório**
- [x] O README está atualizado com suas modificações
- [x] O projeto está funcionando corretamente
- [x] As credenciais de teste estão documentadas

> **🎯 LEMBRE-SE**: O link que você enviará deve ser do formato:
> `https://github.com/SEU-USUARIO/TestTecVix`

---

## 🎯 Objetivos

Este teste avalia sua capacidade de:

- Compreender e seguir uma arquitetura existente
- Implementar funcionalidades seguindo padrões estabelecidos
- Trabalhar com autenticação e autorização (JWT)
- Desenvolver interfaces responsivas e funcionais
- Utilizar boas práticas de versionamento (GitFlow)
- Documentar adequadamente o projeto

---

## 🏗️ Arquitetura do Projeto

O projeto está dividido em três partes principais:

```
TestTecVix/
├── backend-node-vix-test/    # API REST em Node.js + Express + Prisma
├── frontend-react-vix-test/  # Interface em React + TypeScript + Material-UI
├── screenshots/              # Imagens de referência para as telas
└── README.md                 # Este arquivo
```

---

## 💻 Requisitos do Sistema

Antes de começar, certifique-se de ter instalado:

- **Sistema Operacional**: Linux (preferencialmente), macOS ou Windows
- **Docker**: Versão mais recente instalada e configurada
- **Node.js**: Versão LTS (Long Term Support)
- **npm** ou **yarn**: Gerenciador de pacotes

---

## 🛠️ Stack Tecnológica

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma** - ORM (Object-Relational Mapping)
- **MySQL** - Banco de dados relacional
- **JWT** - Autenticação via tokens
- **TypeScript** - Superset JavaScript tipado
- **Jest** - Framework de testes

### Frontend
- **React** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **Material-UI (MUI)** - Biblioteca de componentes
- **Vite** - Build tool e dev server
- **React Router** - Roteamento
- **Axios** - Cliente HTTP
- **Zustand** - Gerenciamento de estado
- **i18next** - Internacionalização
- **Vitest** - Framework de testes

---

## ⚙️ Configuração e Instalação

### 1. Clone o Repositório

```bash
git clone <url-do-repositorio>
cd TestTecVix
```

### 2. Configuração do Backend

#### 2.1. Navegue até a pasta do backend

```bash
cd backend-node-vix-test
```

#### 2.2. Instale as dependências

```bash
npm install
```

#### 2.3. Configure as variáveis de ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com as seguintes configurações:

```env
# URL de conexão com o banco de dados
DATABASE_URL=mysql://root:password@localhost:3312/test-cloud-db

# Configurações do MySQL
MYSQL_ROOT_PASSWORD=password
MYSQL_DATABASE=test-cloud-db
MYSQL_USER=user
MYSQL_PASSWORD=password
MYSQL_HOST=localhost

# Secret para geração de tokens JWT
JWT_SECRET=seu_secret_super_seguro_aqui
```

> **Nota**: A porta do banco de dados é **3312** (não confundir com a porta padrão 3306 do MySQL).

#### 2.4. Suba o banco de dados

```bash
npm run db:up
```

Este comando irá:
- Subir um container Docker com MySQL
- Utilizar o arquivo `docker-compose-db.yml`
- Expor o banco na porta **3312**

#### 2.5. Configure o Prisma e popule o banco

```bash
# Gera o Prisma Client
npx prisma generate

# Executa as migrations e popula o banco com dados de teste
npx prisma migrate reset
```

Ou, alternativamente:

```bash
npx prisma migrate deploy && npx prisma db seed
```

---

## 🚀 Como Executar o Projeto

### Modo Desenvolvimento

#### Backend (API)

```bash
cd backend-node-vix-test
npm run dev
```

A API estará disponível em: **http://localhost:3001**

#### Frontend

```bash
cd frontend-react-vix-test
npm run dev
```

O frontend estará disponível em: **http://localhost:3000**

---

### Modo Produção (Docker)

#### Backend

```bash
cd backend-node-vix-test

# Build da aplicação
npm run build

# Sobe o container Docker
npm run dc:up
```

#### Frontend

```bash
cd frontend-react-vix-test

# Sobe o container Docker (já faz o build automaticamente)
npm run dc:up
```

---

## 🔌 Estrutura de Portas

| Serviço  | Porta |
|----------|-------|
| Frontend | 3000  |
| Backend  | 3001  |
| MySQL    | 3312  |

---

## 📖 Conceitos Importantes

### MSP vs BrandMaster

- **Internamente** e a nível de arquitetura, temos a entidade `brandMaster` (que representa empresas dentro do sistema)
- **Comercialmente** e em muitos lugares no projeto, aparece o termo `MSP`
- Para todos os efeitos, **MSP = BrandMaster** (são a mesma entidade)

### Tipos de Usuários

#### Usuário Vituax
- Usuário **sem** `idBrandMaster` associado
- Considerado um usuário da própria Vituax

#### Usuário com BrandMaster
- Usuário **com** `idBrandMaster` associado
- Pertence a uma empresa/MSP específica

---

## 🔐 Permissões de Usuários

O sistema possui três níveis de permissão:

| Tipo      | Leitura | Criação | Edição | Exclusão |
|-----------|---------|---------|--------|----------|
| `member`  | ✅      | ❌      | ❌     | ❌       |
| `manager` | ✅      | ✅      | ✅     | ❌       |
| `admin`   | ✅      | ✅      | ✅     | ✅       |

---

## 🔑 Credenciais de Teste

> **✅ Todas as credenciais foram implementadas no seed e testadas com sucesso:**

```
Admin (Vituax):
  Email: admin@vituax.com
  Senha: Admin@123

Manager (Vituax):
  Email: manager@vituax.com
  Senha: Manager@123

Member (Vituax):
  Email: member@vituax.com
  Senha: Member@123

MSP Admin (Tech Solutions):
  Email: msp.admin@empresa.com
  Senha: MspAdmin@123

MSP Manager (Tech Solutions):
  Email: msp.manager@empresa.com
  Senha: MspManager@123
```

---

## 🌿 Fluxo de Desenvolvimento (GitFlow)

O projeto seguiu rigorosamente o **GitFlow** conforme solicitado:

1. **Main**: Preservada com o código base original.
2. **Release**: Consolidada com todas as features mergidas.
3. **Features**: Desenvolvidas em branches isoladas e mergidas na release:
   - `feature/backend-infra-db`
   - `feature/backend-auth-users`
   - `feature/backend-business-logic`
   - `feature/frontend-core-auth`
   - `feature/frontend-layout-home`
   - `feature/frontend-mgmt-users-msp`
   - `feature/frontend-vms`
   - `feature/frontend-settings-profile`

---

## 🚀 Soluções Desenvolvidas & Modificações

Nesta seção, resumo as principais melhorias e funcionalidades implementadas.

### 🔐 Autenticação e Segurança
- Implementação completa do fluxo de **Login e Registro** com JWT.
- Criptografia de senhas no backend utilizando `bcrypt`.
- Proteção de rotas no frontend através do componente `PrivatePage`.
- Persistência de sessão e carregamento dinâmico de perfil.

### 🏢 Gestão de MSP (BrandMaster)
- **Criação em 2 etapas**: Interface fluida (Dados da Empresa → Administrador).
- **Filtros e Busca**: Implementação de busca por nome, paginação e filtro por status "POC".
- **Integração com Endereço**: Cadastro completo de localização vinculado ao MSP.

### 🖥️ Máquinas Virtuais (VMs)
- **Mecanismo de Criação**: Sliders interativos para vCPU, RAM e Disco com validações em tempo real.
- **Sugestões de Configuração**: Cards inteligentes que auto-preenchem o formulário.
- **Gerenciamento (My VMs)**: Tabela completa com filtros por status, nome e empresa.
- **Ações Rápidas**: Funções de Start/Stop integradas que refletem o status visualmente (Tags de Status customizadas).

### 👥 Gestão de Colaboradores
- Interface completa de cadastro de funcionários.
- Controle de acesso (RBAC) garantindo que as permissões de `Admin`, `Manager` e `Member` sejam respeitadas tanto no front quanto no back.

### 🎨 Customização (White Label) e UX
- **White Label**: Possibilidade de trocar a logo da empresa (exclusivo para Admins).
- **Perfil do Usuário**: Edição de fotos, dados de contato e alteração de senha segura.
- **Design Premium**: Aplicação de Dark Mode refinado, micro-animações, ilustrações customizadas e tipografia moderna.

### 🛠️ Diferenciais
- **Swagger**: Documentação técnica da API disponível em `http://localhost:3001/api/v1/docs`.
- **Scripts de Auxílio**: Inclusão de scripts para checagem de banco e verificação de uploads.

---

## ✅ Tarefas do Desafio

### 📋 Configuração Inicial
- [x] Criar arquivo `.env` baseado no `.env.example` (backend)
- [x] Criar arquivo `.env` baseado no `.env.exemple` (frontend)

### 🔐 Autenticação e Autorização
- [x] Implementar as rotas de CRUD para usuários
- [x] Implementar rota de login do usuário
- [x] Implementar tela de login `/login`
- [x] Implementar rota de register do usuário
- [x] Implementar tela de register `/register`
- [x] Implementar autenticação com token JWT
- [x] Proteger as rotas da aplicação (exceto login e register)
- [x] Adicionar credenciais de usuários de teste no README

### 🗄️ Updates no Banco de Dados
- [x] Adicionar coluna `pass` na tabela `VM`
- [x] Adicionar coluna `location` do tipo `ETaskLocation` na tabela `VM`
- [x] Adicionar coluna `hasBackup` na tabela `VM`

### 🏠 Funcionalidades da Home Page
- [x] Implementar a função de **start** da VM
- [x] Implementar a função de **pause** da VM
- [x] Implementar os gráficos (mocados) de **Uso de CPU**
- [x] Implementar os gráficos (mocados) de **Uso de Memória**

### ➕ Criação de VM
- [x] Implementar a lista dropdown dos **sistemas operacionais**
- [x] Implementar corretamente a **criação de uma VM**
- [x] Possibilitar a aceitação de **configurações dos cards de sugestão**

### 💾 Gerenciamento de VMs (My VMs)
- [x] Implementar filtro de **pesquisa** (busca por nome)
- [x] Implementar filtro por **status da VM**
- [x] Implementar filtro por **MSP/BrandMaster**
- [x] Implementar filtro **"Apenas minhas VMs"**
- [x] Possibilitar **stop/start** da VM pela tabela e modal
- [x] Trazer informações da VM no modal de edição
- [x] Possibilitar editar: senha, nome, vCPU, Memória, Disco e Backup
- [x] Possibilitar **deletar VM** (Admin only)

### 🏢 Cadastro de MSP
- [x] Implementar componente para **cadastro de MSP em 2 etapas**
- [x] Possibilitar **criar e editar MSP**
- [x] Adicionar campos de **endereço**
- [x] Implementar filtros de **search** e flag **"POC"**

### 👥 Cadastro de Funcionários
- [x] Implementar a tela de **cadastro de funcionários** seguindo a imagem de referência
- [x] Garantir a **responsividade** e **traduções (i18n)**

### 🎨 Configuração White Label
- [x] Permitir alteração da **logo da empresa** (Admin only)

### 👤 Configuração de Perfil e Notificações
- [x] Permitir a edição das **informações de contato**
- [x] Permitir a edição da **senha**
- [x] Permitir a edição da **imagem de perfil**

### 🌟 Tarefas Opcionais/Diferenciais
- [x] Implementar **testes unitários e de integração**
- [x] Fazer a **documentação Swagger da API**

---

## 📸 Referências Visuais
As imagens de referência (`screenshots/`) foram seguidas fielmente, garantindo que o layout e a experiência do usuário fossem preservados.

---

**Entregue por Antigravity (IA Coding Assistant) sob comando do desenvolvedor.** 🚀
