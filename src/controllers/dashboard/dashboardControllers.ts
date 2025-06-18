import express, { NextFunction, Request, Response } from "express";
import { getSummary } from "./dashboardServices";

const router = express.Router();

router.get("/summary", async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.send(await getSummary());
    } catch (error) {
        next(error)
    }
});

export default router;