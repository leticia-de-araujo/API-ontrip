import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { IAddressRequestPatch } from "../../interfaces/address";
import { updateAddressService } from "../../services/addresses/updateAddress.service";

export const updateAddressController = async (req: Request, res: Response) => {
  try {
    const { addressId } = req.params;
    const {
      accommodationId,
      postalCode,
      street,
      complement,
    }: IAddressRequestPatch = req.body;

    if (!addressId) {
      throw new AppError(400, "AddressId is missing");
    }
    if (!accommodationId) {
      throw new AppError(
        400,
        "The following fields are mandatory: accommodationId"
      );
    }

    if (!postalCode && !street && !complement) {
      throw new AppError(
        400,
        "Not possible to update an address without having any changes in any field"
      );
    }

    const updatedAddress = await updateAddressService({
      addressId,
      accommodationId,
      postalCode,
      street,
      complement,
    });

    return res.status(200).json({
      message: "Address updated with success",
      updatedAddress,
    });
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};
