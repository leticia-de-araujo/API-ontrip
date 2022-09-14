import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { Accommodation } from "../../entities/accommodation.entity";
import { Address } from "../../entities/address.entity";
import { Booking } from "../../entities/booking.entity";
import { Photo } from "../../entities/photo.entity";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";

const admOrOwnerAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;

  const route = req.originalUrl.split("/");

  const { id } = req.params;

  if (!id) {
    throw new AppError(400, "Missing ID param on route");
  }

  const userRepo = AppDataSource.getRepository(User);

  const userFromToken = await userRepo.findOneBy({ id: userId });

  if (!userFromToken) {
    throw new AppError(404, "User not found");
  }

  const isAdmin = userFromToken.isAdm;

  if (isAdmin) {
    req.isAdm = true;
    return next();
  }

  if (route[1] === "users") {
    const userAffected = await userRepo.findOneBy({ id: id });

    if (!userAffected) {
      throw new AppError(404, "User not found");
    }

    const notOwner = userFromToken.id != userAffected.id;

    if (notOwner) {
      throw new AppError(
        401,
        "User must be an admin or the owner of the account"
      );
    }

    req.isOwner = true;

    return next();
  }

  if (route[1] === "accommodations") {
    const accommodationRepo = AppDataSource.getRepository(Accommodation);

    const accommodation = await accommodationRepo.findOneBy({ id: id });

    if (!accommodation) {
      throw new AppError(404, "Accommodation not found");
    }

    const notAccommodationOwner = accommodation.owner.id != userFromToken.id;

    if (notAccommodationOwner) {
      throw new AppError(
        401,
        "User must be an admin or the owner of the accommodation"
      );
    }

    req.isOwner = true;

    return next();
  }

  if (route[1] === "bookings") {
    const bookingRepo = AppDataSource.getRepository(Booking);

    const booking = await bookingRepo.findOneBy({ id: id });

    if (!booking) {
      throw new AppError(404, "Booking not found");
    }

    const notBookingOwner = booking.user.id != userFromToken.id;

    const accommodationId = booking.accommodation.id;

    const accommodationRepo = AppDataSource.getRepository(Accommodation);

    const accommodation = await accommodationRepo.findOneBy({
      id: accommodationId,
    });

    if (!accommodation) {
      throw new AppError(404, "Accommodation not found");
    }

    const notAccommodationOwner = accommodation.owner.id != userFromToken.id;

    if (notAccommodationOwner && notBookingOwner) {
      throw new AppError(
        401,
        "User must be the owner of the accommodation, the guest that booked the booking, or an admin"
      );
    }

    req.isOwner = true;

    return next();
  }

  if (route[1] === "addresses") {
    const addressRepo = AppDataSource.getRepository(Address);

    const address = await addressRepo.findOneBy({ id: id });

    if (!address) {
      throw new AppError(404, "Address not found");
    }

    const accommodationId = address.accommodationId;

    const accommodationRepo = AppDataSource.getRepository(Accommodation);

    const accommodation = await accommodationRepo.findOneBy({
      id: accommodationId,
    });

    if (!accommodation) {
      throw new AppError(404, "Accommodation not found");
    }

    const notAccommodationOwner = accommodation.owner.id != userFromToken.id;

    if (notAccommodationOwner) {
      throw new AppError(
        401,
        "User must be the owner of the accommodation set at this address or an admin"
      );
    }

    req.isOwner = true;

    return next();
  }

  if (route[1] === "photos") {
    const photoRepo = AppDataSource.getRepository(Photo);

    const photo = await photoRepo.findOneBy({ id: id });

    if (!photo) {
      throw new AppError(
        400,
        "There's no photo associated with the id used(route params)"
      );
    }

    const accommodationId = photo.accommodation?.id;

    const accommodationRepo = AppDataSource.getRepository(Accommodation);

    const accommodation = await accommodationRepo.findOneBy({
      id: accommodationId,
    });

    if (!accommodation) {
      throw new AppError(404, "Accommodation not found");
    }

    const notAccommodationOwner = accommodation.owner.id != userFromToken.id;

    if (notAccommodationOwner) {
      throw new AppError(
        401,
        "User must be the owner of the accommodation set at this address or an admin"
      );
    }

    req.isOwner = true;

    return next();
  }

  next();
};

export default admOrOwnerAuthMiddleware;
