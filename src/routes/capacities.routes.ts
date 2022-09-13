import { Router } from "express";
import capacitiesCreateController from "../controllers/capacities/createCapacity.controller";
import capacitiesReadAllController from "../controllers/capacities/listCapacities.controller";
import capacitiesReadOneController from "../controllers/capacities/listOneCapacity.controller";
import capacitiesUpdateController from "../controllers/capacities/updateCapacity.controller";
import capacitiesDeleteController from "../controllers/capacities/deleteCapacity.controller";
import authUserMiddleware from "../middlewares/authentications/authUser.middleware";
import { accountValidationMiddleware } from "../middlewares/authentications/accountValidation.middleware";
import admValidationMiddleware from "../middlewares/authentications/admValidation.middleware";
import validateCapacityCreate from "../middlewares/capacities/validateCapacityCreate.middleware";
import capacityCreateSchema from "../schemas/capacities/capacityCreate.schema";
import validateCapacityUpdate from "../middlewares/capacities/validateCapacityUpdate.middleware";
import capacityUpdateSchema from "../schemas/capacities/capacityUpdate.schema";

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
