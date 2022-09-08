import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import capacitiesCreateService from "../../services/capacities/capacitiesCreate.service";

const capacitiesCreateController = async (req: Request, res: Response) => {
  try {
    const { rooms, beds, totalGuests, bathrooms } = req.body;

    const createCapacity = await capacitiesCreateService({
      rooms,
      beds,
      totalGuests,
      bathrooms,
    });

    return res
      .status(201)
      .json({ message: "Capacity created with success", data: createCapacity });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default capacitiesCreateController;
