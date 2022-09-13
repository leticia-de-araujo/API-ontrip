import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { createAddressService } from "../../services/addresses/createAddress.service";

export const createAddressController = async (req: Request, res: Response) => {
  try {
    const {
      country,
      state,
      city,
      postalCode,
      street,
      complement,
      accommodationId,
    } = req.body;

    const address = await createAddressService({
      country,
      state,
      city,
      postalCode,
      street,
      complement,
      accommodationId,
    });

    return res.status(201).json({
      message: "success",
      address: address,
    });
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};
