import type { Request, Response } from "express";
import { UserService } from "../services/userService.js";

class UserController {
    private service: UserService = new UserService();
    
    register = async (req: Request, res: Response) => {
        const data = { name: req.body.name, password: req.body.password };
        if (!data.password || !data.name)
            return res.status(400).json({ "error": "Password and Name as required" });
        if (data.password.length < 8)
            return res.status(422).json({ "error": "Password length must be greater than 8 characters" });
        if (data.name.length < 3 || data.name.length > 20)
            return res.status(422).json({ "error": "the name must be between 3 and 20 characters" });
        
        const result = await this.service.register(data);
        if (!result.token)
            return res.status(result.status).json({ error: result.message });
        res.status(result.status).json({ "token": result.token });
    }
    
    confirm = async (req: Request, res: Response) => {
        if (!req.params.token)
            return res.status(400).json({ error: "token not found" });
        const { token } = req.params;
        const result = await this.service.confirm(token);
        if (!result.user)
            res.status(result.status).json({ error: result.message });
        res.status(result.status).json(result.user);
    }
    
    login = async (req: Request, res: Response) => {
        const data = { name: req.body.name, password: req.body.password };
        if (!data.password || !data.name)
            return res.status(400).json({ "error": "Password and Name as required" });
        const result = await this.service.login(data);
        if (!result.token)
            return res.status(result.status).json({ error: result.message });
        res.status(200).json({ token: result.token });
    }
    
    getAllUsers = async (req: Request, res: Response) => res.status(200).json(await this.service.getAllUsers());
    
    updateUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id)
            return res.status(401).json({ error: "Id is required" });
        const updates = req.body;
        delete updates._id;
        delete updates.__v;
        delete updates.createdAt;
        const result = await this.service.update(id, updates);
        if (!result.user)
            return res.status(result.status).json({ error: result.message });
        res.status(result.status).json({ user: result.user });
    }
    
    getOneUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id)
            return res.status(401).json({ error: "Id is required" });
        const user = await this.service.getOne(id);
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.json(user);
    }
    
    whoAmI = async (req: Request, res: Response) => {
        if (!req.user)
            return res.status(404).json({ error: "User not found"});
        const user = await this.service.whoAmI(req.user)
        res.json({ name: user.name, id: user.id });
    }
    
    deleteUser = async (req: Request, res: Response) => {
        if (!req.params.id)
            return res.status(401).json({ error: "Id not found" })
        const result = await this.service.deleteUser(req.params.id);
        if (!result.user)
            return res.status(result.status).json({ error: result.message })
        res.status(result.status).json({ user: result.user })
    }
}

export const userController = new UserController(); 