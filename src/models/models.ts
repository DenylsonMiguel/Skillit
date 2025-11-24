import mongoose, { Schema, Document, Model } from "mongoose";


// ---------------- DOWNVOTE ----------------
export interface Vote extends Document {
    author: string;
    createdAt: Date;
    value: "up" | "down";
}

const voteSchema = new Schema<Vote>({
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    value: { type: String, required: true }
});

export const VoteModel = mongoose.model<Vote>("Vote", voteSchema);

// ------------------ POST ------------------
export interface Post extends Document {
    title: string;
    message: string;
    author: string;
    createdAt: Date;
    votes: string[];
}

const postSchema = new Schema<Post>({
    title: { type: String, required: true, unique: true },
    message: { type: String, required: true },
    author: { type: String, required: true },
    votes: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now }
});

export const PostModel = mongoose.model<Post>("Post", postSchema);

// ------------------ USER ------------------
export interface User extends Document {
    name: string;
    password: string;
    posts: mongoose.Types.ObjectId[];
    createdAt: Date;
}

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
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