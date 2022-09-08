import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import capacitiesUpdateService from "../../services/capacities/capacitiesUpdate.service";

const capacitiesUpdateController = async (req: Request, res: Response) => {
  try {
    const { rooms, beds, totalGuests, bathrooms } = req.body;

    const id = req.params.id;

    const updatedCapacity = await capacitiesUpdateService(id, {
      rooms,
      beds,
      totalGuests,
      bathrooms,
    });

    return res.json({
      message: "Capacity updated with success",
      data: updatedCapacity,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default capacitiesUpdateController;
