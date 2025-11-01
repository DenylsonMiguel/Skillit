/* Projeto: Skillit - Um "Reddit de habilidades"

Entidades:
- User: id, name, email, passwordHash, createdAt
- SkillPost: id, title, description, userId, createdAt, votesCount
- Comment: id, text, userId, skillPostId, createdAt
- Vote: id, userId, skillPostId

Endpoints:

// Auth
POST   /auth/register       -> cria conta e envia e-mail de boas-vindas (SES)
POST   /auth/login          -> autentica usuário e retorna JWT

// Users
PUT    /users/:id           -> atualiza informações do usuário (nome, senha, etc)
DELETE /users/:id           -> remove a conta do usuário

// Skill Posts
POST   /posts               -> cria novo post de habilidade (precisa do token nos headers)
GET    /posts               -> lista todos os posts ordenados por votos
GET    /posts/:id           -> retorna um post específico
PUT    /posts/:id           -> edita um post (somente o dono)
DELETE /posts/:id           -> deleta um post (somente o dono)

// Votes
POST   /posts/:id/vote      -> adiciona ou atualiza voto (1 ou -1)
GET    /posts/:id/votes     -> retorna contagem total de votos do post

// Comments
POST   /posts/:id/comments  -> adiciona comentário ao post
GET    /posts/:id/comments  -> lista comentários do post

Funcionalidades principais:
- Criação e login de usuários com JWT
- Atualização de nome e senha
- CRUD completo de posts
- Sistema de vote
- Comentários em posts
- Envio de e-mail de boas-vindas com AWS SES
 */
 
 
import app from "./server.js";
import "dotenv/config";
import { connectDB } from "./config/dbConnector.js";

if (!process.env.PORT)
    throw new Error("PORT not found");

const PORT: number = parseInt(process.env.PORT);

app.listen(PORT, () => console.log(`Server started on: ${process.env.HOST ?? PORT} \n ${process.env.HOST? "" : "[WARN] HOST not found"}`));

connectDB();