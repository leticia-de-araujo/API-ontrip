import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import accommodationReadAllService from "../../services/accommodations/accommodationReadAll.service";
import { instanceToPlain } from "class-transformer";

const accommodationReadAllController = async (req: Request, res: Response) => {
  try {
    const accommodationList = await accommodationReadAllService();

    return res.json({
      message: "Successful request",
      accommodations: instanceToPlain(accommodationList),
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default accommodationReadAllController;
