import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { IAddressRequestPatch } from "../../interfaces/address";
import { listAllAddressesService } from "../../services/addresses/listAllAddresses.service";

export const updateAddressController = async (req: Request, res: Response) => {
  try {
    const { addressId } = req.params;
    const {
      accommodationId,
      postalCode,
      street,
      complement,
    }: IAddressRequestPatch = req.body;

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
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};
