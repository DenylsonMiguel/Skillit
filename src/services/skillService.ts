import type { Post, User } from "../models/models.js";
import { PostModel, UserModel } from "../models/models.js";

class SkillService {
    async create(data: { title: string, message: string }, user: { id: string, name: string, expiresIn: number, posts: Post[] }): Promise<Post> {
        const post = new PostModel({ title: data.title, message: data.message, author: user.name });
        await post.save();
        await UserModel.findByIdAndUpdate(user.id, { $push: { posts: post } }, { new: true });
        return post;
    }
}

export default function skillService() {
    return new SkillService();
}