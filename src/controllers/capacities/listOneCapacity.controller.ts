import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import capacitiesReadOneService from "../../services/capacities/listOneCapacity.service";

const capacitiesReadOneController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const readCapacity = await capacitiesReadOneService(id);

    return res.json({ message: "Successful request", capacity: readCapacity });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default capacitiesReadOneController;
