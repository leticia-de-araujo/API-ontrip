import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { IAddressRequest } from "../../interfaces/address";
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
      accommodation: accommodationId,
    } = req.body;
    const { userId } = req;

    if (
      !country ||
      !state ||
      !city ||
      !postalCode ||
      !street ||
      !accommodationId
    ) {
      throw new AppError(
        401,
        "The following fields are required: country, state, city, postalCode, street, accommodation."
      );
    }

    const address = await createAddressService({
      country,
      state,
      city,
      postalCode,
      street,
      complement,
      accommodationId,
      userId: userId!,
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
