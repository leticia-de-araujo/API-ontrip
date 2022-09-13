import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import accommodationDeleteService from "../../services/accommodations/accommodationDelete.service";

const accommodationDeleteController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const accommodationDeleted = await accommodationDeleteService(id);

    return res.status(200).json({ message: accommodationDeleted });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default accommodationDeleteController;
