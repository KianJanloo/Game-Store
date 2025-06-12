import express, { NextFunction, Request, Response } from "express";
import { forgetPassword, login, refresh, register, resetPassword } from "./AuthServices";
import ValidateMiddleware from "../../middlewares/validation/validationMiddleware";
import { registerValidation } from "../../utils/validations/auth/register-validation";
import { loginValidation } from "../../utils/validations/auth/login-validation";
import { refreshValidation } from "../../utils/validations/auth/refresh-validation";
import { forgetPasswordValidation } from "../../utils/validations/auth/forget-password-validation";
import { resetPasswordValidation } from "../../utils/validations/auth/reset-password-validation";

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

router.post("/forget-password", ValidateMiddleware(forgetPasswordValidation), async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await forgetPassword(req.body));
    } catch (error) {
        next(error);
    }
})

router.post("/reset-password", ValidateMiddleware(resetPasswordValidation), async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await resetPassword(req.body));
    } catch (error) {
        next(error);
    }
})


export default router;