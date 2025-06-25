import express, { NextFunction, Request, Response } from 'express';
import authMiddleware from '../../middlewares/auth/authMiddleware';
import { AppError } from '../../utils/error/AppError';
import { addToCart, clearCart, deleteProductFromCart, getCart } from './cartServices';

const router = express.Router();

router.get("/:id", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        res.send(await getCart(userId));
    } catch (error) {
        next(error);
    }
});

router.post("/add/:userId/:productId", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const productId = req.params.productId;
        res.send(await addToCart(userId, productId));
    } catch (error) {
        next(error);
    }
});

router.delete("/delete/product/:userId/:productId", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const productId = req.params.productId;
        res.send(await deleteProductFromCart(userId, productId));
    } catch (error) {
        next(error);
    }
});

router.delete("/clear/:userId", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        res.send(await clearCart(userId));
    } catch (error) {
        next(error);
    }
});

export default router;