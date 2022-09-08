import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import capacitiesReadAllService from "../../services/capacities/capacitiesReadAll.service";

const capacitiesReadAllController = async (req: Request, res: Response) => {
  try {
    const readCapacities = await capacitiesReadAllService();

    return res.json({ message: "Request successful", data: readCapacities });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default capacitiesReadAllController;
