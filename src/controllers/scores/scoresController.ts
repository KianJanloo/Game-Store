import express, { Request, Response, NextFunction } from 'express';
import authMiddleware from '../../middlewares/auth/authMiddleware';
import { editScoreForUser, getScoresByUserId } from './scoresServices';
import { editScoreValidation } from '../.././utils/validations/score/score-validation';
import ValidateMiddleware from '../../middlewares/validation/validationMiddleware';

const router = express.Router();

router.get("/:id", authMiddleware, (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        res.send(getScoresByUserId(userId));
    } catch (error) {
        next(error);
    }
})

router.put("/:id", ValidateMiddleware(editScoreValidation), authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        res.send(await editScoreForUser(userId, data));
    } catch (error) {
        next(error);
    }
})

export default router;