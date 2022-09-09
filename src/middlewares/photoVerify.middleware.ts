import { Request, Response, NextFunction } from "express";
import upload from "../utils/multer.middleware";

export const photoVerifyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { file } = req;

  if (file) {
    upload.single("files");
  }

  next();
};
