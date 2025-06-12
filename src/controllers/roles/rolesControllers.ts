import express, { NextFunction, Request, Response } from "express";
import { changeRole } from "./rolesServices";
import ValidateMiddleware from "../../middlewares/validation/validationMiddleware";
import { changeRoleValidation } from "../../utils/validations/role/change-role-validation";
import authMiddleware from "../../middlewares/auth/authMiddleware";
import { AppError } from "../../utils/error/AppError";

const router = express.Router();

router.put("/change", ValidateMiddleware(changeRoleValidation), authMiddleware, async (req: any, res: Response, next: NextFunction) => {
    try {
        if (req.user.role !== "admin") {
            throw new AppError("Access Unauthorized", 403);
        }
        res.send(await changeRole(req.body));
    } catch (error) {
        next(error);
    }
})

export default router;