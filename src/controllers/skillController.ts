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
    
    deleteSkill = async (req:Request, res:Response) => {
      if (!req.params.id)
        return res.status(401).json("Invalid or missing ID");
      if (!req.user)
        return res.status(406).json({ error: "Login is required" });
      const result = await this.service.deletePost(req.params.id, req.user);
      if (!result.post)
        return res.status(result.status).json({ error: result.error });
      res.status(200).json({ post: result.post });
    }
}

const skillController = new SkillController();

export default skillController;