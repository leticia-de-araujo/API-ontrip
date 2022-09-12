import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import capacitiesReadAllService from "../../services/capacities/listCapacities.service";

const capacitiesReadAllController = async (req: Request, res: Response) => {
  try {
    const readCapacities = await capacitiesReadAllService();

    return res.json({
      message: "Successful request",
      capacities: readCapacities,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default capacitiesReadAllController;
