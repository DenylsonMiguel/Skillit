import "dotenv/config";
import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;

if (!DB_URI)
    throw new Error("DB_URI not defined in environment variables");

export const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("DB connected sucessfully \n");
    } catch (err) {
        throw new Error(`Error: ${err}`);
    }
}