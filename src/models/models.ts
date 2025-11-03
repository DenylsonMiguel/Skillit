import mongoose, { Schema, Document, Model } from "mongoose";

// ----------------- VOTE -----------------
class Vote {
    author: string;
    postId: string;
    constructor(author: string, postId: string) {
        this.author = author;
        this.postId = postId;
    }
}

// ----------------- UPVOTE -----------------
export interface Upvote extends Document {
    author: string;
    createdAt: Date;
}

const upvoteSchema = new Schema<Upvote>({
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const UpvoteModel = mongoose.model<Upvote>("Upvote", upvoteSchema);

// ---------------- DOWNVOTE ----------------
export interface Downvote extends Document {
    author: string;
    createdAt: Date;
}

const downvoteSchema = new Schema<Downvote>({
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const DownvoteModel = mongoose.model<Downvote>("Downvote", downvoteSchema);

// ------------------ POST ------------------
export interface Post extends Document {
    title: string;
    message: string;
    author: string;
    createdAt: Date;
    upvotes: Upvote[];
    downvotes: Downvote[];
}

const postSchema = new Schema<Post>({
    title: { type: String, required: true, unique: true },
    message: { type: String, required: true },
    author: { type: String, required: true },
    upvotes: { type: [upvoteSchema], default: [] },
    downvotes: { type: [downvoteSchema], default: [] },
    createdAt: { type: Date, default: Date.now }
});

export const PostModel = mongoose.model<Post>("Post", postSchema);

// ------------------ USER ------------------
export interface User extends Document {
    name: string;
    password: string;
    posts: Post[];
    createdAt: Date;
}

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    posts: { type: [postSchema], default: [] }
});

export const UserModel = mongoose.model<User>("User", userSchema);

// -------------- PENDING USER --------------
export interface PendingUser extends Document {
    name: string;
    password: string;
    token: string;
    createdAt: Date;
}

const pendingUserSchema = new Schema<PendingUser>({
    name: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, unique: true, required: true },
    createdAt: { type: Date, default: Date.now }
});

pendingUserSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1900 });

export const PendingUserModel = mongoose.model<PendingUser>("PendingUser", pendingUserSchema);