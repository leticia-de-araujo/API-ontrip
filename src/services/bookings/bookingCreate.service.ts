import AppDataSource from "../../data-source";
import { Accommodation } from "../../entities/accommodation.entity";
import { Booking } from "../../entities/booking.entity";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { IBookingRequest } from "../../interfaces/bookings";

const createBookingService = async ({
  checkIn,
  checkout,
  userId,
  accommodationId,
}: IBookingRequest): Promise<Booking> => {
  const bookingRepository = AppDataSource.getRepository(Booking);
  const userRepository = AppDataSource.getRepository(User);
  const accommodationRepository = AppDataSource.getRepository(Accommodation);

  const user = await userRepository.findOneBy({ id: userId });
  if (!user) throw new AppError(404, "User not found");

  const accommodation = await accommodationRepository.findOneBy({
    id: accommodationId,
  });
  if (!accommodation) throw new AppError(404, "Accommodation not found");

  const newBooking = bookingRepository.create({
    checkIn,
    checkOut: checkout,
    user: user,
    accommodation: accommodation,
  });

  await bookingRepository.save(newBooking);

  return newBooking;
};

export default createBookingService;
