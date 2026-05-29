# Fullstack Task Manager

Sistema fullstack de gerenciamento de tarefas desenvolvido com React, Node.js, Express, PostgreSQL e Prisma ORM.

## Funcionalidades

- Cadastro de usuários
- Login com autenticação JWT
- Rotas protegidas
- Criação de tarefas
- Edição de tarefas
- Exclusão de tarefas
- Separação de tarefas por usuário
- Persistência de dados com PostgreSQL
- ORM Prisma

## 🛠️ Tecnologias utilizadas

### Front-end
- React
- TypeScript
- TailwindCSS
- React Router DOM

### Back-end
- Node.js
- Express
- JWT
- bcryptjs
- Prisma ORM

### Banco de dados
- PostgreSQL

---

# Preview

Em breve...

---

# ⚙️ Como executar o projeto

## 1. Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
```

---

## 2. Instale as dependências

### Front-end

```bash
cd frontend
npm install
```

### Back-end

```bash
cd backend
npm install
```

---

## 3. Configure o arquivo `.env`

Crie um arquivo `.env` dentro da pasta backend:

```env
DATABASE_URL=""
JWT_SECRET=""
```

---

## 4. Execute as migrations do Prisma

```bash
npx prisma migrate dev
```

---

## 5. Inicie o servidor backend

```bash
node src/server.js
```

---

## 6. Inicie o frontend

```bash
npm run dev
```

---

# Aprendizados

Esse projeto foi desenvolvido com foco em aprendizado de:

- Autenticação JWT
- Relacionamento entre tabelas
- CRUD completo
- Integração Front-end + Back-end
- Banco de dados relacional
- Prisma ORM
- PostgreSQL

---

# Status do projeto

Projeto em desenvolvimento.
