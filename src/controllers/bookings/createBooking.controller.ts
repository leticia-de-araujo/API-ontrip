import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import createBookingService from "../../services/bookings/bookingCreate.service";

const createBookingController = async (req: Request, res: Response) => {
  try {
    const { checkIn, checkout, userId, accommodationId } = req.body;

    const createBooking = await createBookingService({
      checkIn,
      checkout,
      userId,
      accommodationId,
    });

    return res.status(201).json({ message: "success", data: createBooking });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default createBookingController;
