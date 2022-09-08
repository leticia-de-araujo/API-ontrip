import AppDataSource from "../../data-source";
import { Booking } from "../../entities/booking.entity";
import { AppError } from "../../errors/AppError";

const deleteBookingService = async (id: string): Promise<String> => {
  const bookingRepository = AppDataSource.getRepository(Booking);

  const booking = await bookingRepository.findOneBy({ id: id });
  if (!booking) throw new AppError(404, "Booking not found");

  await bookingRepository.delete(id);

  return "Booking deleted with success";
};

export default deleteBookingService;
