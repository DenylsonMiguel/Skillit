import { Router } from "express";
import skillController from "../controllers/skillController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const skillRoutes = Router();

/**
 * @swagger
 * /skill:
 *   post:
 *     summary: Create a new skill post
 *     tags: [Skill]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Skill created successfully
 *       406:
 *         description: Login required
 *       400:
 *         description: Missing title or message
 */
skillRoutes.post('/skill', verifyJWT, skillController.createSkill);

/**
 * @swagger
 * /skills:
 *   get:
 *     summary: Get all skill posts
 *     tags: [Skill]
 *     responses:
 *       200:
 *         description: List of all skill posts
 */
skillRoutes.get('/skills', skillController.getAllSkills);

/**
 * @swagger
 * /skill/{id}:
 *   get:
 *     summary: Get a skill by its ID
 *     tags: [Skill]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Skill ID
 *     responses:
 *       200:
 *         description: Skill found
 *       401:
 *         description: Invalid or missing ID
 *       404:
 *         description: Skill not found
 */
skillRoutes.get('/skill/:id', skillController.getSkillById);

/**
 * @swagger
 * /skills/{id}:
 *   get:
 *     summary: Get all skills created by a specific user
 *     tags: [Skill]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of user's skills
 *       401:
 *         description: Missing ID
 *       404:
 *         description: User not found
 */
skillRoutes.get('/skills/:id', skillController.getAllSkillsOfAUser);

/**
 * @swagger
 * /skill/{id}:
 *   put:
 *     summary: Update an existing skill
 *     tags: [Skill]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Skill ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 *       401:
 *         description: Missing ID
 *       406:
 *         description: Unauthorized
 *       404:
 *         description: Skill not found
 */
skillRoutes.put('/skill/:id', verifyJWT, skillController.updateSkill);

/**
 * @swagger
 * /skill/{id}:
 *   delete:
 *     summary: Delete a skill post
 *     tags: [Skill]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Skill ID
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       401:
 *         description: Missing ID
 *       406:
 *         description: Unauthorized
 *       404:
 *         description: Skill not found
 */
skillRoutes.delete('/skill/:id', verifyJWT, skillController.deleteSkill);

/**
 * @swagger
 * /vote/{id}:
 *   post:
 *     summary: Vote (up or down) on a skill
 *     tags: [Vote]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Skill ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: string
 *                 enum: [UP, DOWN]
 *     responses:
 *       200:
 *         description: Vote registered or toggled
 *       401:
 *         description: Missing or invalid data
 *       406:
 *         description: Login required
 *       404:
 *         description: Skill not found
 */
skillRoutes.post('/vote/:id', verifyJWT, skillController.vote);

/**
 * @swagger
 * /votes/{id}:
 *   get:
 *     summary: Get all votes (up and down) from a skill
 *     tags: [Vote]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Skill ID
 *     responses:
 *       200:
 *         description: Returns upvotes and downvotes
 *       401:
 *         description: Missing ID
 *       404:
 *         description: Skill not found
 */
skillRoutes.get('/votes/:id', skillController.getVotes);

export default skillRoutes;