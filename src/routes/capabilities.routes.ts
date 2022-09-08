import { Router } from "express";
import createCapacityController from "../controllers/capabilities/createCapacity.controller";
import readCapabilitiesController from "../controllers/capabilities/readCapabilities.controller";
import readCapacityController from "../controllers/capabilities/readCapacity.controller";
import { admValidationMiddleware } from "../middlewares/admValidation.middleware";

const routes = Router();

const capabilitiesRoutes = () => {
  routes.post("", admValidationMiddleware, createCapacityController);
  routes.get("", readCapabilitiesController);
  routes.get("/:id", readCapacityController);
  return routes;
};

export default capabilitiesRoutes;
