import { Router } from "express";

import createTypeController from "../controllers/types/createType.controller";
import listOneTypeController from "../controllers/types/listOneType.controller";
import listTypesController from "../controllers/types/listTypes.controller";
import updateTypeController from "../controllers/types/updateType.controller";

import { admValidationMiddleware } from "../middlewares/admValidation.middleware";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const routes = Router();

const typesRoutes = () => {
  routes.get("", listTypesController);
  routes.get("/:typeId", listOneTypeController);
  routes.post(
    "",
    authUserMiddleware,
    admValidationMiddleware,
    createTypeController
  );
  routes.patch(
    "/:id",
    authUserMiddleware,
    admValidationMiddleware,
    updateTypeController
  );

  return routes;
};

export default typesRoutes;
