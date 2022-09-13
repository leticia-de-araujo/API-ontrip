import { Booking } from './../../entities/booking.entity';
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";

const deleteBookingService = async (id: string): Promise<String> => {

  const bookingRepository = AppDataSource.getRepository(Booking);

  const booking = await bookingRepository.findOne({where:{id:id}})

  if (!booking) throw new AppError(404, "Booking not found");

  if (booking.status === "cancelled")
    throw new AppError(400, "Booking already deleted");

  await bookingRepository.update(id, {
    status: "cancelled",
  });

  return "Booking deleted with success";
};

export default deleteBookingService;
