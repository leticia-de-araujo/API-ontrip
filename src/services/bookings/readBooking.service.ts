import AppDataSource from "../../data-source";
import { Booking } from "../../entities/booking.entity";
import { AppError } from "../../errors/AppError";

const readBookingService = async (bookingId: string): Promise<Booking> => {
  const bookingRepository = AppDataSource.getRepository(Booking);


  const booking = await bookingRepository.findOneBy({ id: bookingId });
  if (!booking) throw new AppError(404, "Booking not found");

  return booking;
};

export default readBookingService;
