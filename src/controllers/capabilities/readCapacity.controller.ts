import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import readCapacityService from "../../services/capabilities/readCapacity.service";

const readCapacityController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const readCapacity = await readCapacityService(id);

    return res.json({ message: "Request sucessful", data: readCapacity });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default readCapacityController;
