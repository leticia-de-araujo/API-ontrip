import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import accommodationUpdateService from "../../services/accommodations/accommodationUpdate.service";

const accommodationUpdateController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const {
      name,
      description,
      dailyPrice,
      verifiedByAdm,
      specialOffer,
      capacityId,
      typeId,
    } = req.body;

    const updatedAccommodation = await accommodationUpdateService(id, {
      name,
      description,
      dailyPrice,
      verifiedByAdm,
      specialOffer,
      capacityId,
      typeId,
    });

    return res.json({
      message: "Accommodation updated with success",
      accommodation: updatedAccommodation,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default accommodationUpdateController;
