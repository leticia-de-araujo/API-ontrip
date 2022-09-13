import AppDataSource from "../../data-source";
import { Booking } from "../../entities/booking.entity";
import { AppError } from "../../errors/AppError";

const readBookingService = async (id: string): Promise<Booking> => {
  const bookingRepository = AppDataSource.getRepository(Booking);

  const booking = await bookingRepository.find();

  const newBooking = booking.filter((booking) => booking.id === id);


  if (!newBooking[0]) {
    throw new AppError(404, "Booking not found");
  }
  
  return newBooking[0];
};

export default readBookingService;
