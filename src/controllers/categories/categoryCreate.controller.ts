import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import categoryCreateService from "../../services/categories/categoryCreate.service";

const categoryCreateController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const createCategory = await categoryCreateService({ name });

    return res
      .status(201)
      .json({ message: "category created", data: createCategory });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default categoryCreateController;
