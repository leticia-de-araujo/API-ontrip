import AppDataSource from "../../data-source";
import { Booking } from "../../entities/booking.entity";
import { AppError } from "../../errors/AppError";

const deleteBookingService = async (id: string): Promise<String> => {
  const bookingRepository = AppDataSource.getRepository(Booking);

  const booking = await bookingRepository.findOneBy({ id: id });
  if (!booking) throw new AppError(404, "Booking not found");
  if (booking.status === "cancelled")
    throw new AppError(400, "Booking already cancelled");

  await bookingRepository.update(id, {
    status: "cancelled",
  });

  return "Booking deleted with success";
};

export default deleteBookingService;
