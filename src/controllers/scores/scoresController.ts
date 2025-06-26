import express, { Request, Response, NextFunction } from 'express';
import authMiddleware from '../../middlewares/auth/authMiddleware';
import { decreaseScoreByUser, getAllScoresOfUsers, getScoresByUserId, increaseScoreForUser } from './scoresServices';
import { editScoreValidation } from '../.././utils/validations/score/score-validation';
import ValidateMiddleware from '../../middlewares/validation/validationMiddleware';
import { AppError } from '../.././utils/error/AppError';

const router = express.Router();

router.get("/", authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        const role = req.user.role;
        if(role !== "admin"){
            throw new AppError("Access Unauthorized", 403)
        }
        const query = req.query;
        res.send(await getAllScoresOfUsers(query));
    } catch (error) {
        next(error);
    }
})

router.get("/:id", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        res.send(await getScoresByUserId(userId));
    } catch (error) {
        next(error);
    }
})

router.put("/increase/:id", ValidateMiddleware(editScoreValidation), authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        res.send(await increaseScoreForUser(userId, data));
    } catch (error) {
        next(error);
    }
})

router.put("/decrease/:id", ValidateMiddleware(editScoreValidation), authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        res.send(await decreaseScoreByUser(userId, data));
    } catch (error) {
        next(error);
    }
})

export default router;