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
 *       - Users
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
 *       - Users
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
 *   post:
 *     summary: Confirma o registro de um usuário através do token
 *     tags:
 *       - Users
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rolePass:
 *                 type: string
 *                 example: SECRET
 *     responses:
 *       200:
 *         description: Conta confirmada
 *       400:
 *         description: Token inválido ou expirado
 */
userRoutes.post('/confirm/:token', userController.confirm);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags:
 *       - Users
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
 *       - Users
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
 *       - Users
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
 *       - Users
 *     responses:
 *       200:
 *         description: Usuário autenticado retornado
 *       401:
 *         description: Token inválido
 */
userRoutes.get('/me', verifyJWT, userController.whoAmI);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     description: Remove um usuário do sistema usando seu ID. Retorna o usuário deletado se existir.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser deletado
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: ID inválido ou não fornecido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid ID
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 */
userRoutes.delete("/user/:id", verifyJWT, userController.deleteUser);

export default userRoutes;