import { Router } from "express";
import { admValidationMiddleware } from "../middlewares/admValidation.middleware";
import capacitiesCreateController from "../controllers/capacities/capacitiesCreate.controller";
import capacitiesReadAllController from "../controllers/capacities/capacitiesReadAll.controller";
import capacitiesReadOneController from "../controllers/capacities/capicitiesReadOne.controller";
import capacitiesUpdateController from "../controllers/capacities/capacitiesUpdate.controller";

const routes = Router();

const capacitiesRoutes = () => {
  routes.post("", admValidationMiddleware, capacitiesCreateController);
  routes.get("", capacitiesReadAllController);
  routes.get("/:id", capacitiesReadOneController);
  routes.patch("/:id", admValidationMiddleware, capacitiesUpdateController);
  return routes;
};

export default capacitiesRoutes;
