import "express";
import type { Post } from "./models/models.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        expiresIn: number;
        posts: Post[];
      };
    }
  }
}