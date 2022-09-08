import { Router } from "express";
import updateBookingController from "../controllers/bookings/updateBooking.controller";
import createCapacityController from "../controllers/capabilities/createCapacity.controller";
import deleteCapacityController from "../controllers/capabilities/deleteCapacity.controller";
import readCapabilitiesController from "../controllers/capabilities/readCapabilities.controller";
import readCapacityController from "../controllers/capabilities/readCapacity.controller";
import { admValidationMiddleware } from "../middlewares/admValidation.middleware";

const routes = Router();

const capabilitiesRoutes = () => {
  routes.post("", admValidationMiddleware, createCapacityController);
  routes.get("", readCapabilitiesController);
  routes.get("/:id", readCapacityController);
  routes.patch("/:id", admValidationMiddleware, updateBookingController);
  routes.delete("/:id", admValidationMiddleware, deleteCapacityController);
  return routes;
};

export default capabilitiesRoutes;
