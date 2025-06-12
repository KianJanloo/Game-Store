import express, { NextFunction, Request, Response } from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from './ProductsServices';
import ValidateMiddleware from '../../middlewares/validation/validationMiddleware';
import { createProductSchema, updateProductSchema } from '../../utils/validations/createProduct-schema';
import authMiddleware from '../../middlewares/auth/authMiddleware';
import { AppError } from '../../utils/error/AppError';

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await getProducts());
    } catch (error) {
        next(error);
    }
})

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await getProductById(req.params.id));
    } catch (error) {
        next(error);
    }
})


router.post("/", ValidateMiddleware(createProductSchema), authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        if (req.user.role !== "admin") {
            throw new AppError("Access Unauthorized", 403);
        }
        res.send(await createProduct(req.body));
    } catch (error) {
        next(error);
    }
})

router.put("/:id", ValidateMiddleware(updateProductSchema), authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        if (req.user.role !== "admin") {
            throw new AppError("Access Unauthorized", 403);
        }
        res.send(await updateProduct(req.body, req.params.id));
    } catch (error) {
        next(error);
    }
})

router.delete("/:id", authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        if (req.user.role !== "admin") {
            throw new AppError("Access Unauthorized", 403);
        }
        res.send(await deleteProduct(req.params.id));
    } catch (error) {
        next(error);
    }
})

export default router;