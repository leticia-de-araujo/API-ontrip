import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const path = require("path");
const allowedExt = [".png", ".gif", ".svg", ".jpeg", ".jpg"];

const fileExtensionHandlerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files: any = req.files;

    const fileExtensions: any = [];

    Object.keys(files).forEach((key) => {
      fileExtensions.push(path.extname(files[key].name));
    });

    const allowed = fileExtensions.every((ext: any) =>
      allowedExt.includes(ext)
    );

    if (!allowed) {
      throw new AppError(
        400,
        "Extension not allowed, images are only accepted in png, gif, svg, jpeg,.jpg"
      );
    }
    next();
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};

export default fileExtensionHandlerMiddleware;
