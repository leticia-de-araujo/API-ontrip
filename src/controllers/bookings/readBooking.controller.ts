import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import readBookingService from "../../services/bookings/readBooking.service";

const readBookingController = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;

    const readBooking = await readBookingService(id);

    return res.json({ message: "Success", data: readBooking });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default readBookingController;
