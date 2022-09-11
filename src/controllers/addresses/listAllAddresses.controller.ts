import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { listAllAddressesService } from "../../services/addresses/listAllAddresses.service";

export const listAllAddressesController = async (
  req: Request,
  res: Response
) => {
  try {
    const addresses = await listAllAddressesService();

    return res.status(200).json({
      message: "success",
      data: addresses,
    });
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};
