import { Router } from "express";

import createTypeController from "../controllers/types/createType.controller";
import listTypesController from "../controllers/types/listTypes.controller";
import updateTypeController from "../controllers/types/updateType.controller";
import { admValidationMiddleware } from "../middlewares/admValidation.middleware";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const routes = Router();

const typesRoutes = () => {
  routes.post(
    "",
    /*     authUserMiddleware,
    admValidationMiddleware, */
    createTypeController
  );
  routes.get("", listTypesController);
  routes.patch("/:id", updateTypeController);

  return routes;
};

export default typesRoutes;
