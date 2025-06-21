import express, { Response, Request, NextFunction } from 'express';
import authMiddleware from '../../middlewares/auth/authMiddleware';
import { createFavorite, deleteFavorite, getFavoriteById, getFavoritesByUserId } from './favoritesServices';
import { AppError } from '../.././utils/error/AppError';

const router = express.Router();

router.get("/", authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id;
        res.send(await getFavoritesByUserId(userId));
    } catch (error) {
        next(error);
    }
})

router.get("/:id", authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        const role = req.user.role;
        if(role !== "admin"){
            throw new AppError("Access unauthorized", 403);
        }
        const favoriteId = req.params.id;
        res.send(await getFavoriteById(favoriteId));
    } catch (error) {
        next(error);
    }
})

router.post("/:id", authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id;
        const productId = req.params.id;
        res.send(await createFavorite(userId, productId));
    } catch (error) {
        next(error);
    }
})

router.delete("/:id", authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        const favoriteId = req.params.id;
        res.send(await deleteFavorite(favoriteId));
    } catch (error) {
        next(error);
    }
})

export default router;