import express, { NextFunction, Request, Response } from "express";
import { createCategory, deleteCategory, getCategories, getCategoryById } from "./categoriesService";
import authMiddleware from "../../middlewares/auth/authMiddleware";
import { AppError } from "../../utils/error/AppError";
import { createCategoryValidation } from "../../utils/validations/categories/create-category-validarion";
import ValidateMiddleware from "../../middlewares/validation/validationMiddleware";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);
        res.send(await getCategories(page, limit));
    } catch (error) {
        next(error);
    }
})

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await getCategoryById(req.params.id));
    } catch (error) {
        next(error);
    }
})

router.post("/", ValidateMiddleware(createCategoryValidation), authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        if (req.user.role !== "admin") {
            throw new AppError("Access Unauthorized", 403);
        }
        res.send(await createCategory(req.body));
    } catch (error) {
        next(error);
    }
})

router.delete("/:id", authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        if (req.user.role !== "admin") {
            throw new AppError("Access Unauthorized", 403);
        }
        res.send(await deleteCategory(req.params.id));
    } catch (error) {
        next(error);
    }
})

export default router;