import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import categoryDeleteService from "../../services/categories/deleteCategories.service";

const categoryDeleteController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const categoryDelete = await categoryDeleteService(id);

    return res.status(200).json({ message: categoryDelete });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default categoryDeleteController;
