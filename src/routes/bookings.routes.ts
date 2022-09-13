import { admValidationMiddleware } from './../middlewares/admValidation.middleware';
import { admOrOwnerAuthMiddleware } from './../middlewares/admOrOwnerAuth.middleware';
import { Router } from "express";
import createBookingController from "../controllers/bookings/createBooking.controller";
import deleteBookingController from "../controllers/bookings/deleteBooking.controller";
import readBookingController from "../controllers/bookings/readBooking.controller";
import readBookingsController from "../controllers/bookings/readBookings.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";
import { bookingCreateSchema, validateBookingCreate } from "../middlewares/validadeBookingCreate.middleware";

const routes = Router();

const bookingsRoutes = () => {
  routes.post("", authUserMiddleware, validateBookingCreate(bookingCreateSchema),createBookingController);
  routes.get("", authUserMiddleware, admValidationMiddleware, readBookingsController);
  routes.get("/:id", authUserMiddleware, admOrOwnerAuthMiddleware, readBookingController);
  routes.delete("/:id", authUserMiddleware, admOrOwnerAuthMiddleware, deleteBookingController);
  return routes;
};

export default bookingsRoutes;
