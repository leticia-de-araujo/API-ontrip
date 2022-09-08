import { Request, Response, NextFunction } from "express";
import fileupload from "express-fileupload";
import { AppError } from "../errors/AppError";

const MB = 5;
const fileSizeLimit = MB * 1024 * 1024;

const fileLimiterHandlerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files: any = req.files;

    const filesOverTheLimit: any[] = [];
    Object.keys(files).forEach((key) => {
      if (files[key].size > fileSizeLimit) {
        filesOverTheLimit.push(files[key].name);
      }
    });
    if (filesOverTheLimit.length > 0) {
      throw new AppError(
        400,
        `file size is to big, please respect the limit of ${MB} MB`
      );
    }
    next();
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};

export default fileLimiterHandlerMiddleware;
