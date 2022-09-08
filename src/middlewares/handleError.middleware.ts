import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const handleErrorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "Error",
      code: error.statusCode,
      message: error.message,
    });
  }

  return res.status(500).json({
    status: "Error",
    code: 500,
    message: "Internal server error",
  });
};

export default handleErrorMiddleware;
