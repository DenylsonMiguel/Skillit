import "express";
import type { Post } from "./models/models.js";
import type { UserTokenInfo } from "./utils/userUtils.js";

declare global {
  namespace Express {
    interface Request {
      user?: UserTokenInfo;
    }
  }
}