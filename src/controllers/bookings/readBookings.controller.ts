import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import readBookingsService from "../../services/bookings/readBookings.service";

const readBookingsController = async (req: Request, res: Response) => {
  try {
    const readBookings = await readBookingsService();
    return res.json({ message: "Successful request", bookings: readBookings });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default readBookingsController;
