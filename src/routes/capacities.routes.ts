import { Router } from "express";

import { admValidationMiddleware } from "../middlewares/admValidation.middleware";
import { authUserMiddleware } from "../middlewares/authUser.middleware";
import {
  validateCapacityCreate,
  capacityCreateSchema,
} from "../middlewares/validateCapacityCreate.middleware";
import {
  validateCapacityUpdate,
  capacityUpdateSchema,
} from "../middlewares/validateCapacityUpdate.middleware";

import capacitiesCreateController from "../controllers/capacities/createCapacity.controller";
import capacitiesReadAllController from "../controllers/capacities/listCapacities.controller";
import capacitiesReadOneController from "../controllers/capacities/listOneCapacity.controller";
import capacitiesUpdateController from "../controllers/capacities/updateCapacity.controller";
import capacitiesDeleteController from "../controllers/capacities/deleteCapacity.controller";
import { accountValidationMiddleware } from "../middlewares/accountValidation. middleware";

const routes = Router();

const capacitiesRoutes = () => {
  routes.post(
    "",
    authUserMiddleware,
    accountValidationMiddleware,
    admValidationMiddleware,
    validateCapacityCreate(capacityCreateSchema),
    capacitiesCreateController
  );
  routes.get("", capacitiesReadAllController);
  routes.get("/:id", capacitiesReadOneController);
  routes.patch(
    "/:id",
    authUserMiddleware,
    accountValidationMiddleware,
    admValidationMiddleware,
    validateCapacityUpdate(capacityUpdateSchema),
    capacitiesUpdateController
  );
  routes.delete(
    "/:id",
    authUserMiddleware,
    accountValidationMiddleware,
    admValidationMiddleware,
    capacitiesDeleteController
  );
  return routes;
};

export default capacitiesRoutes;
