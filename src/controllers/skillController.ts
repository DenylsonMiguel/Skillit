import skillService from "../services/skillService.js";
import type { Request, Response } from "express";


class SkillController {
    private service = skillService();
    
    createSkill = async (req: Request, res: Response) => {
        const data = { title: req.body.title, message: req.body.message };
        if (!req.user)
            return res.status(406).json({ error: "Login is required" });
        if (!data.title || !data.message)
            return res.status(400).json({ error: "Title and Message as required" });
        const post = this.service.create(data, req.user);
        res.status(201).json(post);
    }
    
    getAllSkills = async (req:Request, res:Response) => {
        const skills = await this.service.getAll();
        res.json(skills);
    }
    
    getSkillById = async (req:Request, res:Response) => {
        if (!req.params.id)
            return res.status(401).json("Invalid or missing ID");
        const result = await this.service.getById(req.params.id);
        if (!result.post)
            return res.status(result.status).json({ error: result.error });
        res.json(result.post);
    }
    
    getAllSkillsOfAUser = async (req:Request, res:Response) => {
        if (!req.params.id)
            return res.status(401).json("Invalid or missing ID");
        const result = await this.service.getAllOfUser(req.params.id);
        if (!result.posts)
            res.status(result.status).json({ error: result.error });
        res.json(result.posts);
    }
    
    updateSkill = async (req: Request, res:Response) => {
        const { id } = req.params;
        if (!id)
            return res.status(401).json({ error: "Id is required" });
        if (!req.user)
            return res.status(406).json({ error: "User not loged" });
        const userName = req.user.name;
        const updates = req.body;
        delete updates._id;
        delete updates.__v;
        delete updates.createdAt;
        const result = await this.service.update(userName, id, updates);
        if (!result.post)
            return res.status(result.status).json({ error: result.error });
        res.status(result.status).json({ post: result.post });
    }
}

const skillController = new SkillController();

export default skillController;