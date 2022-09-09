import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import categoryReadAllService from "../../services/categories/categoryReadAll.service";

const categoryReadAllController = async (req: Request, res: Response) => {
  try {
    const categoryReadAll = await categoryReadAllService();

    return res.json({ message: "Success", data: categoryReadAll });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default categoryReadAllController;
