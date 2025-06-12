import express, { NextFunction, Request, Response } from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from './ProductsServices';
import ValidateMiddleware from '../../middlewares/validation/validationMiddleware';
import { createProductSchema, updateProductSchema } from '../../utils/validations/createProduct-schema';

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


router.post("/", ValidateMiddleware(createProductSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await createProduct(req.body));
    } catch (error) {
        next(error);
    }
})

router.put("/:id", ValidateMiddleware(updateProductSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await updateProduct(req.body, req.params.id));
    } catch (error) {
        next(error);
    }
})

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await deleteProduct(req.params.id));
    } catch (error) {
        next(error);
    }
})

export default router;