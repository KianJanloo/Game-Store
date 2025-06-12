import { NextFunction, Response } from "express";
import { AppError } from "../../utils/error/AppError";
import { verifyToken } from "../../utils/token/tokenService";

const authMiddleware = (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        throw new AppError("Unauthorized", 401);
    }
    const decoded = verifyToken(token);
    if(!decoded){
        throw new AppError("Unauthorized", 401);
    }
    req.user = decoded;
    next();
}

export default authMiddleware;