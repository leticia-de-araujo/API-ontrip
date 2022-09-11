import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import categoryReadOneService from "../../services/categories/listOneCategory.service";

const categoryReadOneController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const categoryRead = await categoryReadOneService(id);

    return res.json({ message: "Successful request", category: categoryRead });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default categoryReadOneController;
