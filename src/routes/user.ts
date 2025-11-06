import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const userRoutes = Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Neymar JR
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
userRoutes.post('/auth/register', userController.register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Faz login de um usuário existente
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Neymar JR
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
userRoutes.post('/auth/login', userController.login);

/**
 * @openapi
 * /confirm/{token}:
 *   get:
 *     summary: Confirma o registro de um usuário através do token
 *     tags:
 *       - Usuários
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Conta confirmada
 *       400:
 *         description: Token inválido ou expirado
 */
userRoutes.get('/confirm/:token', userController.confirm);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags:
 *       - Usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
userRoutes.get('/users', userController.getAllUsers);

/**
 * @openapi
 * /user/{id}:
 *   get:
 *     summary: Retorna um usuário específico
 *     tags:
 *       - Usuários
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do usuário
 *       404:
 *         description: Usuário não encontrado
 */
userRoutes.get('/user/:id', userController.getOneUser);

/**
 * @openapi
 * /user/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Usuários
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Atualizado
 *               password:
 *                 type: string
 *                 example: novasenha
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       401:
 *         description: Token inválido ou ausente
 *       404:
 *         description: Usuário não encontrado
 */
userRoutes.put('/user/:id', verifyJWT, userController.updateUser);

/**
 * @openapi
 * /me:
 *   get:
 *     summary: Retorna o usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Usuários
 *     responses:
 *       200:
 *         description: Usuário autenticado retornado
 *       401:
 *         description: Token inválido
 */
userRoutes.get('/me', verifyJWT, userController.whoAmI);

userRoutes.delete("/user/:id", userController.deleteUser);

export default userRoutes;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDdlOTZhOThmMzgyNGM1NmVhMjkyYiIsIm5hbWUiOiJEZW55bHNvbk1pZ3VlbCIsImlhdCI6MTc2MjM4ODk5NSwiZXhwIjoxNzYyMzkyNTk1fQ.E5Nn_Wleu5ct_uz5C-lmT3J9XJIN_3w5j8vdNq3f80I