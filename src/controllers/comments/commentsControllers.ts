import express, { NextFunction, Request, Response } from 'express';
import authMiddleware from '../../middlewares/auth/authMiddleware';
import { createComment, deleteCommentById, editComment, getAllComments, getCommentById } from './commentsServices';
import ValidateMiddleware from '../../middlewares/validation/validationMiddleware';
import { createCommentValidate } from '../.././utils/validations/comments/comments-validation';

const router = express.Router();

router.post("/add/:id", ValidateMiddleware(createCommentValidate), authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.id;
        const authorId = req.user.id;
        const data = req.body;
        res.send(await createComment(authorId, productId, data))
    } catch (error) {
        next(error);
    }
})

router.put("/edit/:id", authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        const commentId = Number(req.params.id);
        const data = req.body;
        res.send(await editComment(commentId, data))
    } catch (error) {
        next(error);
    }
})

router.delete("/delete/:id", authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        const commentId = Number(req.params.id);
        res.send(await deleteCommentById(commentId))
    } catch (error) {
        next(error);
    }
})

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);
        res.send(await getAllComments(page, limit))
    } catch (error) {
        next(error);
    }
})

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commentId = Number(req.params.id);
        res.send(await getCommentById(commentId));
    } catch (error) {
        next(error);
    }
})

export default router;