import skillService from "../services/skillService.js";
import type { Request, Response } from "express";


class SkillController {
    private service = skillService();
    
    createSkill = async (req: Request, res: Response) => {
        const newPost = req.body;
        if (!newPost)
            return res.status(401).json({ error: "Insert a New Post" });
        if (!req.user)
            return res.status(406).json({ error: "Login is required" });
        const post = this.service.create(newPost, req.user);
        res.status(201).json(post);
    }
}

const skillController = new SkillController();

export default skillController;