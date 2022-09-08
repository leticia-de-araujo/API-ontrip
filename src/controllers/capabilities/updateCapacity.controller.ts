import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import updateCapacityService from "../../services/capabilities/updateCapacity.service";

const updateCapacityController = async (req: Request, res: Response) => {
  try {
    const { rooms, beds, totalGuests, bathrooms } = req.body;
    const id = req.params.id;

    const updateCapacity = await updateCapacityService(id, {
      rooms,
      beds,
      totalGuests,
      bathrooms,
    });

    return res.json({ message: "Capacity updated", data: updateCapacity });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default updateCapacityController;
