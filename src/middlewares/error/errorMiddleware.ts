import { Request, Response, NextFunction } from "express";
import logger from "../../utils/logs/logger";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status = err.status || 500;
    const message = err.message || "initial server error";

    res.status(status).json({
      success: false,
      message,
    });
    logger.error(message)
  } catch (error) {
    res.status(500).json({ success: false, message: "initial server error" });
    logger.error("initial server error")
  }
};

export default errorMiddleware;
