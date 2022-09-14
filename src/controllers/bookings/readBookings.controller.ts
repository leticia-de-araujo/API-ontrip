import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import readBookingsService from "../../services/bookings/readBookings.service";
import { instanceToPlain } from "class-transformer";

const readBookingsController = async (req: Request, res: Response) => {
  try {
    const readBookings = await readBookingsService();
    return res.json({ message: "Successful request", bookings: instanceToPlain(readBookings) });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default readBookingsController;
