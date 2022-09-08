import { Request, Response, NextFunction } from "express";
import fileupload from "express-fileupload";
import { AppError } from "../errors/AppError";

const fileExistsHandlerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files) {
      throw new AppError(400, "Please insert an image");
    }
    next();
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};

export default fileExistsHandlerMiddleware;
