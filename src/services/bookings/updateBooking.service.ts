import { IBookingRequestPatch } from "../../interfaces/bookings";
import { Booking } from "../../entities/booking.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";

const updateBookingService = async (
  id: string,
  { checkIn, checkout, status }: IBookingRequestPatch
): Promise<Booking> => {
  const bookingRepository = AppDataSource.getRepository(Booking);

  const booking = await bookingRepository.findOneBy({ id: id });
  if (!booking) throw new AppError(404, "Booking not found");

  await bookingRepository.update(id, {
    checkIn: checkIn ? checkIn : booking.checkIn,
    checkOut: checkout ? checkout : booking.checkOut,
    status: status ? status : booking.status,
  });

  const bookingUpdated = await bookingRepository.findOneBy({ id: id });

  return bookingUpdated!;
};

export default updateBookingService;
