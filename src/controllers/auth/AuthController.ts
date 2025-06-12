import express, { NextFunction, Request, Response } from "express";
import { login, refresh, register } from "./AuthServices";
import ValidateMiddleware from "../../middlewares/validation/validationMiddleware";
import { registerValidation } from "../../utils/validations/auth/register-validation";
import { loginValidation } from "../../utils/validations/auth/login-validation";
import { refreshValidation } from "../../utils/validations/auth/refresh-validation";

const router = express.Router();

router.post("/register", ValidateMiddleware(registerValidation), async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await register(req.body));
    } catch (error) {
        next(error);
    }
})

router.post("/login", ValidateMiddleware(loginValidation), async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await login(req.body));
    } catch (error) {
        next(error);
    }
})

router.post("/refresh", ValidateMiddleware(refreshValidation), async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await refresh(req.body));
    } catch (error) {
        next(error);
    }
})


export default router;