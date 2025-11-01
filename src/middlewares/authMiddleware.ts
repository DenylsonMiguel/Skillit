import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization as string | undefined;
    if (!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).json({ error: "Missing or invalid token"});
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as JwtPayload;
        if (typeof decoded !== "object" || !decoded.id || !decoded.name)
            return res.status(403).json({ error: "Invalid token payload" });
        const now = Math.floor(Date.now() / 1000);
        const timeLeft = decoded.exp ? decoded.exp - now : null;
        req.user = { id: decoded.id, name: decoded.name, expiresIn: timeLeft ?? 0, posts: decoded.posts };
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
    }
}