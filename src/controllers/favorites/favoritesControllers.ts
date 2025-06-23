import express, { Response, Request, NextFunction } from 'express';
import authMiddleware from '../../middlewares/auth/authMiddleware';
import { createFavorite, deleteFavorite, getFavoritesByUserId } from './favoritesServices';
import { AppError } from '../.././utils/error/AppError';

const router = express.Router();

router.get("/", authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id;
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);
        res.send(await getFavoritesByUserId(userId, page, limit));
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