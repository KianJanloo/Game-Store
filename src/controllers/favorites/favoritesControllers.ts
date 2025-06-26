import express, { Response, Request, NextFunction } from 'express';
import authMiddleware from '../../middlewares/auth/authMiddleware';
import { createFavorite, deleteFavorite, getFavoritesByUserId } from './favoritesServices';

const router = express.Router();

router.get("/", authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        const userId = req.user.id;
        const query = req.query;
        res.send(await getFavoritesByUserId(userId, query));
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