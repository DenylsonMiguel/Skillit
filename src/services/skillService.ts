import type { Post, User } from "../models/models.js";
import { PostModel, UserModel } from "../models/models.js";
import type { UserTokenInfo } from "../utils/userUtils.js"
import mongoose from "mongoose";

class SkillService {
    async create(data: { title: string; message: string }, user: UserTokenInfo): Promise<Post> {
        const post = new PostModel({
            title: data.title,
            message: data.message,
            author: user.name,
        });
        await post.save();
        await UserModel.findByIdAndUpdate(user.id, { $push: { posts: post._id } }, { new: true });
        const saved = await PostModel.findById(post._id);
        if (!saved)
            throw new Error("Failed to create post");
        return saved;
    }
    
    async getAll(): Promise<Post[]> {
        const posts = await PostModel.find();
        return posts;
    }
    
    async getById(id: string): Promise<{ status: number, error: string, post?: Post }> {
        const skill = await PostModel.findById(id);
        if (!skill)
            return { status: 404, error: "Post not found"};
        return { status: 200, error: "", post: skill };
    }
    
    async getAllOfUser(id: string): Promise<{ posts?: Post[], status: number, error: string }> {
        const posts: Post[] = [];
        const user = await UserModel.findById(id);
        if (!user)
            return { status: 404, error: "User not found" };
        for (const postId of user.posts) {
            const skill = await PostModel.findById(postId);
            if (!skill)
                break;
            posts.push(skill);
        }
        return { posts: posts, status: 200, error: "" };
    }
}

export default function skillService() {
    return new SkillService();
}