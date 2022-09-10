import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";

import listTypesService from "../../services/types/listTypes.service";

const listTypesController = async (req: Request, res: Response) => {
  try {
    const types = await listTypesService();

    return res.status(200).send({ message: "Request sucessful", types: types });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default listTypesController;
