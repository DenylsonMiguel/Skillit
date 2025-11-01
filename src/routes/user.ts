import { Router } from "express";
import { userController } from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const userRoutes = Router();

userRoutes.post('/auth/register', userController.register);
userRoutes.post('/auth/login', userController.login);
userRoutes.get('/confirm/:token', userController.confirm);
userRoutes.get('/users', userController.getAllUsers);
userRoutes.get('/user/:id', userController.getOneUser)
userRoutes.put('/user/:id', verifyJWT, userController.updateUser);
userRoutes.get('/me', verifyJWT, userController.whoAmI);
userRoutes.delete("/user/:id", userController.deleteUser)

export default userRoutes;