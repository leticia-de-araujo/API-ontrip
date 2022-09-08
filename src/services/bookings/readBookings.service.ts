import AppDataSource from "../../data-source";
import { Booking } from "../../entities/booking.entity";

const readBookingsService = async (): Promise<Booking[]> => {
  const bookingRepository = AppDataSource.getRepository(Booking);

  const bookings = await bookingRepository.find();

  return bookings;
};

export default readBookingsService;
