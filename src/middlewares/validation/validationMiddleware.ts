import { NextFunction, Request, Response } from "express";
import logger from "../../utils/logs/logger";

const ValidateMiddleware = (validationSchema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const body = req.body;
        const parsed = validationSchema.safeParse(body);
        if(!parsed.success){
            res.status(400).json({
                message: " Validation failed ",
                errors: parsed.error.issues.map((error: any) => (
                    error.message
                )),
            })
            logger.error(" Validation failed ")
        }
        else {
            next();
        }
    }
}

export default ValidateMiddleware;