import { Router } from "express";
import skillController from "../controllers/skillController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const skillRoutes = Router();

skillRoutes.post('/skill', verifyJWT, skillController.createSkill);
skillRoutes.get('/skills', skillController.getAllSkills);
skillRoutes.get('/skill/:id', skillController.getSkillById);
skillRoutes.get('/skills/:id', skillController.getAllSkillsOfAUser);
// skillRoutes.put('/skill/:id', verifyJWT, skillController.updateSkill);
skillRoutes.delete('/skill/:id', verifyJWT, skillController.deleteSkill);
// skillRoutes.post('/upvote/:id', verifyJWT, skillController.upvoteSkill);
// skillRoutes.post('/downvote/:id', verifyJWT, skillController.downvoteSkill);

export default skillRoutes;