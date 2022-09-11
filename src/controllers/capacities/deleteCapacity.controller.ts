import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import capacitiesDeleteService from "../../services/capacities/deleteCapacity.service";

const capacitiesDeleteController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const deleteCapacity = await capacitiesDeleteService(id);

    return res.status(200).json({ message: deleteCapacity });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default capacitiesDeleteController;
