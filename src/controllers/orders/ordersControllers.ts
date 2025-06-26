import express, { NextFunction, Request, Response } from 'express';
import authMiddleware from '../../middlewares/auth/authMiddleware';
import { addOrderOfUser, deleteOrder, editStatus, getOrderById, getOrders } from './ordersServices';
import { AppError } from '../.././utils/error/AppError';

const router = express.Router();

router.post("/:id", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        res.send(await addOrderOfUser(userId));
    } catch (error) {
        next(error);
    }
})

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query;
        res.send(await getOrders(query));
    } catch (error) {
        next(error);
    }
})

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderId = req.params.id;
        res.send(await getOrderById(orderId));
    } catch (error) {
        next(error);
    }
})

router.put("/:id", authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        const role = req.user.role;
        if (role !== "admin") {
            throw new AppError("Access unauthorized", 403);
        }
        const orderId = req.params.id;
        const data = req.body
        res.send(await editStatus(orderId, data?.status));
    } catch (error) {
        next(error);
    }
})

router.delete("/delete/:id", authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        const role = req.user.role;
        if (role !== "admin") {
            throw new AppError("Access unauthorized", 403);
        }
        const orderId = req.params.id;
        res.send(await deleteOrder(orderId));
    } catch (error) {
        next(error);
    }
})

export default router;