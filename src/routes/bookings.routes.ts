import { admValidationMiddleware } from './../middlewares/admValidation.middleware';
import { admOrOwnerAuthMiddleware } from './../middlewares/admOrOwnerAuth.middleware';
import { Router } from "express";
import createBookingController from "../controllers/bookings/createBooking.controller";
import deleteBookingController from "../controllers/bookings/deleteBooking.controller";
import readBookingController from "../controllers/bookings/readBooking.controller";
import readBookingsController from "../controllers/bookings/readBookings.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";
import { bookingCreateSchema, validateBookingCreate } from "../middlewares/validadeBookingCreate.middleware";
import { accountValidationMiddleware } from '../middlewares/accountValidation. middleware';

const routes = Router();

const bookingsRoutes = () => {
  routes.post("", authUserMiddleware, accountValidationMiddleware, validateBookingCreate(bookingCreateSchema),createBookingController);
  routes.get("", authUserMiddleware, accountValidationMiddleware, admValidationMiddleware, readBookingsController);
  routes.get("/:id", authUserMiddleware, accountValidationMiddleware, admOrOwnerAuthMiddleware, readBookingController);
  routes.delete("/:id", authUserMiddleware, accountValidationMiddleware, admOrOwnerAuthMiddleware, deleteBookingController);
  return routes;
};

export default bookingsRoutes;
