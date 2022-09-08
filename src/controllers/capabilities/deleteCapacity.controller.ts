import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import deleteCapacityService from "../../services/capabilities/deleteCapacity.service";

const deleteCapacityController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const deleteCapacity = await deleteCapacityService(id);

    return res.status(204).json({ message: deleteCapacity });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default deleteCapacityController;
