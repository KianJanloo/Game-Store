import express, { NextFunction, Request, Response } from "express";
import { cancelPayment, continuePayment, createPayment, deletePaymentById, getPaymentById, getPayments, getPaymentsByUserId } from "./paymentsServices";
import authMiddleware from "../../middlewares/auth/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        const { user } = req;
        if (user.role !== "admin") {
            throw new Error("Access unauthorized");
        }
        res.send(await getPayments());
    } catch (error) {
        next(error)
    }
});

router.get("/:id", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        res.send(await getPaymentsByUserId(id));
    } catch (error) {
        next(error)
    }
})

router.get("/payment/:id", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        res.send(await getPaymentById(id));
    } catch (error) {
        next(error)
    }
})


router.post("/:id", authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        const { id } = req.user;
        const productId = req.params.id;
        const data = req.body;
        res.send(await createPayment(productId, id, data));
    } catch (error) {
        next(error);
    }
})

router.put("/continue/:id", authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        const { user } = req;
        if (user.role !== "admin") {
            throw new Error("Access unauthorized");
        }
        const paymentId = req.params.id;
        res.send(await continuePayment(paymentId))
    } catch (error) {
        next(error)
    }
})

router.put("/cancel/:id", authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        const { user } = req;
        if (user.role !== "admin") {
            throw new Error("Access unauthorized");
        }
        const paymentId = req.params.id;
        res.send(await cancelPayment(paymentId))
    } catch (error) {
        next(error)
    }
})

router.delete("/:id", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const paymentId = req.params.id;
        res.send(await deletePaymentById(paymentId))
    } catch (error) {
        next(error)
    }
})

export default router;