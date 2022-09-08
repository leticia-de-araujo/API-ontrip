import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import updateBookingService from "../../services/bookings/updateBooking.service";

const updateBookingController = async (req: Request, res: Response) => {
  try {
    const { checkIn, checkout, status } = req.body;
    const id = req.params.id;

    const updateBooking = await updateBookingService(id, {
      checkIn,
      checkout,
      status,
    });

    return res.json({
      message: "Booking updated",
      data: instanceToPlain(updateBooking),
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.statusCode, error.message);
    }
  }
};

export default updateBookingController;
