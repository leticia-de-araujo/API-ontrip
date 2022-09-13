import { Router } from "express";
import createBookingController from "../controllers/bookings/createBooking.controller";
import deleteBookingController from "../controllers/bookings/deleteBooking.controller";
import readBookingController from "../controllers/bookings/readBooking.controller";
import readBookingsController from "../controllers/bookings/readBookings.controller";
import { accountValidationMiddleware } from "../middlewares/authentications/accountValidation.middleware";
import admOrOwnerAuthMiddleware from "../middlewares/authentications/admOrOwnerAuth.middleware";
import admValidationMiddleware from "../middlewares/authentications/admValidation.middleware";
import authUserMiddleware from "../middlewares/authentications/authUser.middleware";
import validateBookingCreate from "../middlewares/bookings/validadeBookingCreate.middleware";
import bookingCreateSchema from "../schemas/bookings/bookingCreate.schema";

const routes = Router();

const bookingsRoutes = () => {
  routes.post(
    "",
    authUserMiddleware,
    accountValidationMiddleware,
    validateBookingCreate(bookingCreateSchema),
    createBookingController
  );
  routes.get(
    "",
    authUserMiddleware,
    accountValidationMiddleware,
    admValidationMiddleware,
    readBookingsController
  );
  routes.get(
    "/:id",
    authUserMiddleware,
    accountValidationMiddleware,
    admOrOwnerAuthMiddleware,
    readBookingController
  );
  routes.delete(
    "/:id",
    authUserMiddleware,
    accountValidationMiddleware,
    admOrOwnerAuthMiddleware,
    deleteBookingController
  );
  return routes;
};

export default bookingsRoutes;
