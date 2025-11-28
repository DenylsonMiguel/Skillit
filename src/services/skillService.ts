import type { Post, User, Vote } from "../models/models.js";
import { PostModel, UserModel, VoteModel } from "../models/models.js";
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
      try {
        if (!mongoose.Types.ObjectId.isValid(id))
          return { status: 401, error: "Invalid ID" };
        const skill = await PostModel.findById(id);
        if (!skill)
          return { status: 404, error: "Post not found"};
        return { status: 200, error: "", post: skill };
      } catch (err) {
        console.error("Internal error on update an user:", err);
        return { status: 500, error: "Internal server error" };
      }
    }
    
    async getAllOfUser(id: string): Promise<{ posts?: Post[], status: number, error: string }> {
      try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return { status: 401, error: "Invalid ID" };
        }
        const posts: Post[] = [];
        const user = await UserModel.findById(id);
        if (!user)
          return { status: 404, error: "User not found" };
        for (const postId of user.posts) {
          const post = await PostModel.findById(postId);
          if (!post)
            continue;
          posts.push(post);
        }
        return { posts: posts, status: 200, error: "" };
      } catch (err) {
        console.error("Internal error on update an user:", err);
        return { status: 500, error: "Internal server error" };
      }
    }
    
    async deletePost(id: string, user: UserTokenInfo): Promise<{ status: number, error: string, post?: Post }> {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return { status: 401, error: "Invalid ID" };
      }
      try {
        const post = await PostModel.findById(id);
        if (!post)
          return { status: 404, error: "Post not found" };
        if (post.author !== user.name)
          return { status: 406, error: "Not authorized" };
        await post.deleteOne();
        return { status: 200, error: "", post: post };
      } catch (err) {
        console.error(`An Error as ocurrupted: ${err}`);
        return { status: 500, error: "Internal server error" };
      }
    }
    
    async update(id: string, updates: { title?: string, message?: string }, user: UserTokenInfo): Promise<{ status: number, error: string, post?: Post }> {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return { status: 401, error: "Invalid ID" };
      }
      try {
        const post = await PostModel.findById(id);
        if (!post) return { status: 404, error: "User not found" };
        if (user.name !== post.author) return { status: 406, error: "User unauthorized" };
        const updatedPost = await PostModel.findByIdAndUpdate(id, updates, { new: true }).lean();
        return { status: 200, error: "", post: post as unknown as Post };
      } catch (err) {
        console.error("Internal error on update an user:", err);
        return { status: 500, error: "Internal server error" };
      }
    }
    
    async vote(id: string, user: UserTokenInfo, value: "up"|"down"): Promise<{ status: number, error: string, vote?: Vote }> {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return { status: 401, error: "Invalid ID" };
      }
      try {
        const post = await PostModel.findById(id);
        if (!post)
          return { status: 404, error: "Post not found" };
        let existing: Vote | null = null;

        for (const voteId of post.votes) {
          const vote = await VoteModel.findById(voteId);
          if (vote && vote.author === user.name) {
            existing = vote;
            break;
          }
        }
        
        let vote;
        if (!existing) {
          vote = await VoteModel.create({
            author: user.name,
            value: value
          });
          post.votes.push(vote._id as string)
        } else {
          existing.value = existing.value === "up" ? "down" : "up";
          vote = existing;
        }
        await post.save();
        return { status: 200, error: "", vote: vote as unknown as Vote };
      } catch (err) {
        console.error("Internal error on update an user:", err);
        return { status: 500, error: "Internal server error" };
      }
    }
    
    async getVotes(id: string): Promise<{ error: string, status: number, upvotes?: string[], downvotes?: string[] }> {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return { status: 401, error: "Invalid ID" };
      }
      try {
        const post = await PostModel.findById(id);
        if (!post) return { status: 404, error: "Post not found" };
        
        const upvotes = (
          await Promise.all(
            post.votes.map(async (i: string) => {
              const vote = await VoteModel.findById(i);
              return vote?.value === "up" ? i : null;
            })
          )
        ).filter(Boolean);
        
        const downvotes = (
          await Promise.all(
            post.votes.map(async (i: string) => {
              const vote = await VoteModel.findById(i);
              return vote?.value === "down" ? i : null;
            })
          )
        ).filter(Boolean);
        const upvotesClean = upvotes.filter((v): v is string => v !== null);
        const downvotesClean = downvotes.filter((v): v is string => v !== null);

        return { status: 200, error: "", upvotes: upvotesClean, downvotes: downvotesClean };
      } catch (err) {
        console.log("Error on getVotes: " + err);
        return { status: 500, error: "Internal server error" };
      }
    }
    
    async deletePost(id: string, user: UserTokenInfo): Promise<{ status: number, error: string, post?: Post }> {
      try {
        const post = await PostModel.findById(id);
        if (!post)
          return { status: 404, error: "Post not found" };
        if (post.author != user.name)
          return { status: 406, error: "Not authorized" };
        await post.deleteOne();
        return { status: 200, error: "", post: post };
      } catch (err) {
        console.error(`An Error as ocurrupted: ${err}`);
        return { status: 500, error: "Internal server error" };
      }
    }
    
    async update(id: string, updates: { title?: string, message?: string }): Promise<{ status: number, error: string, post?: Post }> {
      try {
        const post = await PostModel.findByIdAndUpdate(id, updates, { new: true }).lean();
        if (!post) return { status: 404, error: "User not found" };
        return { status: 200, error: "", post: post as unknown as Post };
      } catch (err) {
        console.error("Internal error on update an user:", err);
        return { status: 500, error: "Internal server error" };
      }
    }
}

export default function skillService() {
  return new SkillService();
}