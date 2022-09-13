import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import accommodationCreateService from "../../services/accommodations/accommodationCreate.service";

const accommodationCreateController = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      dailyPrice,
      typeId,
      userId,
      capacityId,
      categoryId,
    } = req.body;

    const accommodationCreate = await accommodationCreateService({
      name,
      description,
      dailyPrice,
      typeId,
      userId,
      capacityId,
      categoryId,
    });

    return res.status(201).json({
      message: "Accommodation created with success",
      accommodation: accommodationCreate,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default accommodationCreateController;
