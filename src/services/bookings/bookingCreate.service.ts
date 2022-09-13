import AppDataSource from "../../data-source";
import { Accommodation } from "../../entities/accommodation.entity";
import { Booking } from "../../entities/booking.entity";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { IBookingRequest } from "../../interfaces/bookings";

const createBookingService = async ({
  checkIn,
  checkOut,
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

  const findEqualBooking = await bookingRepository.findOneBy({
      user: user,
      accommodation: accommodation,
      checkIn: checkIn,
      checkOut: checkOut
  });
  
  if(findEqualBooking){
    throw new AppError(409, "This booking is already registered");
  }

  const newBooking = bookingRepository.create({
    checkIn: checkIn,
    checkOut: checkOut,
    user: user,
    accommodation: accommodation
  });

  await bookingRepository.save(newBooking);

  return newBooking;
};

export default createBookingService;
