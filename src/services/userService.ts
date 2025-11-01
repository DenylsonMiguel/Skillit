import type { User } from "../models/models.js";
import { UserModel, PendingUserModel } from "../models/models.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import type { UserTokenInfo } from "../utils/userUtils.js";

if (!process.env.JWT_SECRET)
    throw new Error("JWT_SECRET not found");
const JWT_SECRET = process.env.JWT_SECRET as string;

export class UserService {
    async register(data: { name: string; password: string }): Promise<{ status: number; message: string; token?: string }> {
        if (!data.name || !data.password)
            return { status: 400, message: "The name or password is invalid" };

        const existing = await PendingUserModel.findOne({ name: data.name });
        if (existing)
            return { status: 409, message: "User already pending confirmation" };

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const token = crypto.randomBytes(20).toString("hex");
        const pending = new PendingUserModel({ name: data.name, password: hashedPassword, token });
        await pending.save();

        return { status: 202, message: "User pending created", token: pending.token };
    }

    async confirm(token: string): Promise<{ status: number; message: string; user?: User }> {
        const pending = await PendingUserModel.findOne({ token });
        if (!pending)
            return { status: 404, message: "invalid or expired token" };

        const existingUser = await UserModel.findOne({ name: pending.name });
        if (existingUser)
            return { status: 409, message: "User already registered" };

        const user = new UserModel({ name: pending.name, password: pending.password });
        await user.save();
        await PendingUserModel.deleteOne({ token });

        return { status: 201, message: "User registered", user: user.toObject() as unknown as User };
    }

    async login(data: { name: string; password: string }): Promise<{ status: number; message: string; token?: string }> {
        const user = await UserModel.findOne({ name: data.name });
        if (!user)
            return { status: 404, message: "User not found" };

        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch)
            return { status: 401, message: "invalid password" };

        const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, { expiresIn: "1h" });
        return { status: 200, message: "login successful", token };
    }

    getAllUsers = async (): Promise<User[]> => {
        const users = await UserModel.find().lean();
        return users as unknown as User[];
    };

    async update(id: string, updates: { name?: string; password?: string }): Promise<{ status: number; message: string; user?: User }> {
        try {
            if (updates.password)
                updates.password = await bcrypt.hash(updates.password, 10);

            const user = await UserModel.findByIdAndUpdate(id, updates, { new: true }).lean();
            if (!user)
                return { status: 404, message: "User not found" };

            return { status: 200, message: "User updated", user: user as unknown as User };
        } catch (err) {
            console.error("Internal error on update an user:", err);
            return { status: 500, message: "Internal error" };
        }
    }

    getOne = async (id: string): Promise<User | null> => {
        const user = await UserModel.findById(id).lean();
        return (user as unknown as User) ?? null;
    };

    whoAmI = async (user: UserTokenInfo): Promise<UserTokenInfo> => user;

    deleteUser = async (id: string): Promise<{ status: number; message: string; user?: User }> => {
        const userDeleted = await UserModel.findByIdAndDelete(id).lean();
        if (!userDeleted)
            return { status: 404, message: "User not found" };

        return { status: 200, message: "User deleted", user: userDeleted as unknown as User };
    };
}