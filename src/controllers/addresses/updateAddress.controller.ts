import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { IAddressRequestPatch } from "../../interfaces/address";
import { updateAddressService } from "../../services/addresses/updateAddress.service";

export const updateAddressController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      accommodationId,
      postalCode,
      street,
      complement,
    }: IAddressRequestPatch = req.body;

    const address = await updateAddressService(id, {
      accommodationId,
      postalCode,
      street,
      complement,
    });

    return res.status(200).json({
      message: "Address updated with success",
      address: address,
    });
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};
