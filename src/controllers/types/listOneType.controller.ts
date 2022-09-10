import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";

import listOneTypeService from "../../services/types/listOneType.service";

const listOneTypeController = async (req: Request, res: Response) => {
  try {
    const { typeId } = req.params;
    const type = await listOneTypeService(typeId);

    return res.status(200).send({ message: "Successful request", type: type });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default listOneTypeController;
