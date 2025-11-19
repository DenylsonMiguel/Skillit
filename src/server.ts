import express from "express";
import type { Request, Response, NextFunction } from "express";
const app = express();

import skillRoutes from "./routes/skill.js";
import userRoutes from "./routes/user.js";

import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(morgan("dev"));
app.use(limiter);
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONT!,
  credentials: true
}));
app.use(express.json());

app.use(skillRoutes);
app.use(userRoutes);

export default app;