import express, { NextFunction, Request, Response } from "express";
import { deleteUser, editProfile, getUsers, getUsersById } from "./usersServices";
import authMiddleware from "../../middlewares/auth/authMiddleware";
import { AppError } from "../../utils/error/AppError";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query;
        res.send(await getUsers(query));
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
        if (req.user.role !== "admin") {
            throw new AppError("Access Unauthorized", 401);
        }
        else {
            res.send(await deleteUser(req.params.id));
        }
    } catch (error) {
        next(error);
    }
})

router.put("/:id", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const data = req.body;
        res.send(await editProfile(id, data));
    } catch (error) {
        next(error);
    }
})


export default router;