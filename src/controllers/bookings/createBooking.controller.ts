import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import createBookingService from "../../services/bookings/bookingCreate.service";

const createBookingController = async (req: Request, res: Response) => {
  try {
    const { checkIn, checkOut, userId, accommodationId } = req.body;

    const createBooking = await createBookingService({
      checkIn,
      checkOut,
      userId,
      accommodationId,
    });


    return res.status(201).json({ message: "Booking created with success", booking: createBooking });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default createBookingController;
