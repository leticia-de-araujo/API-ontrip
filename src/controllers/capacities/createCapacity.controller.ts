import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import capacitiesCreateService from "../../services/capacities/createCapacity.service";

const capacitiesCreateController = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const createCapacity = await capacitiesCreateService(data);

    return res.status(201).json({
      message: "Capacity created with success",
      capacity: createCapacity,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default capacitiesCreateController;
