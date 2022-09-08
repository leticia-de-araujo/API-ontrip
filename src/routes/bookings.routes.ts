import { Router } from "express";
import createBookingController from "../controllers/bookings/createBooking.controller";
import deleteBookingController from "../controllers/bookings/deleteBooking.controller";
import readBookingController from "../controllers/bookings/readBooking.controller";
import readBookingsController from "../controllers/bookings/readBookings.controller";
import updateBookingController from "../controllers/bookings/updateBooking.controller";
import { admValidationMiddleware } from "../middlewares/admValidation.middleware";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const routes = Router();

const bookingsRoutes = () => {
  routes.post("", authUserMiddleware, createBookingController);
  routes.patch("", authUserMiddleware, updateBookingController);
  routes.get("", admValidationMiddleware, readBookingsController);
  routes.get("/:id", authUserMiddleware, readBookingController);
  routes.delete("", admValidationMiddleware, deleteBookingController);
  return routes;
};

export default bookingsRoutes;
