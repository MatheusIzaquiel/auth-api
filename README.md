# Auth API - Sistema de Autenticação JWT

Backend completo de autenticação com registro, login e rotas protegidas, construído em **Node.js + Express + TypeScript + Prisma + SQLite**.

O projeto implementa um fluxo seguro de autenticação com JWT (JSON Web Token), hash de senhas com bcrypt, middleware de proteção e banco de dados persistente.

Ideal para portfólio júnior/fullstack ou como base para aplicações com login.

## Tecnologias utilizadas

- Node.js + Express
- TypeScript (tipagem forte)
- Prisma ORM (com SQLite para simplicidade)
- JWT (jsonwebtoken) para tokens de acesso
- bcryptjs para hash de senhas
- Middleware de autenticação customizado

## Funcionalidades

- Registro de usuário (com validação de senha e confirmação)
- Login com retorno de token JWT
- Rota protegida `/profile` (retorna dados do usuário logado)
- Verificação de token em rotas protegidas
- Senhas armazenadas com hash seguro (bcrypt)
- Banco de dados local com SQLite (fácil de rodar e testar)

## Rotas da API

| Método | Rota              | Descrição                              | Autenticação necessária? |
|--------|-------------------|----------------------------------------|---------------------------|
| POST   | `/api/auth/register` | Cadastra novo usuário                  | Não                       |
| POST   | `/api/auth/login`    | Realiza login e retorna token          | Não                       |
| GET    | `/api/profile`       | Retorna perfil do usuário logado       | Sim (Bearer Token)        |

### Exemplos de corpo (JSON)

**Register**
```json
{
  "name": "usuario",
  "email": "usuario@teste.com",
  "password": "12345678",
  "confirmPassword": "12345678"
}
````
**Login**
```json
{
  "email": "usuario@teste.com",
  "password": "12345678",
}
```
**Resposta de sucesso (login/register)**
```json
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "usuario",
    "email": "usuario@teste.com"
  }
}
```
**Profile (protegido)**
```json
{
  "user": {
    "id": 1,
    "name": "usuario",
    "email": "usuario@teste.com",
    "createdAt": "2026-01-20T19:00:00.000Z"
  }
}
```

Estrutura do projeto
```json
src/
├── controllers/          # Lógica dos endpoints
│   ├── authController.ts
│   └── profileController.ts
├── interfaces/           # Tipos TypeScript
│   └── user.ts
├── middleware/           # Middleware de autenticação
│   └── auth.ts
├── routes/               # Definição das rotas
│   └── authRoutes.ts
├── utils/                # Funções auxiliares
│   ├── generateToken.ts
│   └── prisma.ts
└── serve.ts              # Arquivo principal do servidor
prisma/
├── schema.prisma         # Definição do modelo do banco
└── dev.db                # Banco SQLite local (não commitado)
```
