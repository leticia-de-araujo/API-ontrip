import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import deleteTypeService from "../../services/types/deleteType.service";

const deleteTypeController = async (req: Request, res: Response) => {
  try {
    const id = req.params.typeId;

    const test = await deleteTypeService(id);
    console.log(test);
    return res.status(200).send({ message: "Type deleted with success" });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default deleteTypeController;
