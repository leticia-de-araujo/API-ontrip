import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import createCapacityService from "../../services/capabilities/createCapacity.service";

const createCapacityController = async (req: Request, res: Response) => {
  try {
    const { rooms, beds, totalGuests, bathrooms } = req.body;

    const createCapacity = await createCapacityService({
      rooms,
      beds,
      totalGuests,
      bathrooms,
    });

    return res
      .status(201)
      .json({ message: "capacity created", data: createCapacity });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default createCapacityController;
