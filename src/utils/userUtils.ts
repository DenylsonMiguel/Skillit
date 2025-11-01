import type { Post } from '../models/models.js';

export type UserTokenInfo = {
  id: string;
  name: string;
  expiresIn: number;
  posts: Post[]
}