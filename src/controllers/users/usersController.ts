import express, { NextFunction, Request, Response } from "express";
import { deleteUser, getUsers, getUsersById } from "./usersServices";
import authMiddleware from "../../middlewares/auth/authMiddleware";
import { AppError } from "../../utils/error/AppError";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);
        res.send(await getUsers(page, limit));
    } catch (error) {
        next(error);
    }
})

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await getUsersById(req.params.id));
    } catch (error) {
        next(error);
    }
})

router.delete("/:id", authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        if(req.user.role !== "admin"){
            throw new AppError("Access Unauthorized", 401);
        }
        else {
            res.send(await deleteUser(req.params.id));
        }
    } catch (error) {
        next(error);
    }
})

export default router;