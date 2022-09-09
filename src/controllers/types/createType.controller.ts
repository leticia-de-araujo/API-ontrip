import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";

import createTypeService from "../../services/types/createType.service";

const createTypeController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newType = await createTypeService({ name });

    return res
      .status(201)
      .send({ message: "Type created successfully", data: newType });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default createTypeController;
