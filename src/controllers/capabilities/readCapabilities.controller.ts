import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import readCapabilitiesService from "../../services/capabilities/readCapabilities.service";

const readCapabilitiesController = async (req: Request, res: Response) => {
  try {
    const readCapabilities = await readCapabilitiesService();

    return res.json({ message: "Request sucessful", data: readCapabilities });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default readCapabilitiesController;
