import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";

export const createAddressController = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};
