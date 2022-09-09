import { Router } from "express";

import createTypeController from "../controllers/types/createType.controller";
import { admValidationMiddleware } from "../middlewares/admValidation.middleware";

const routes = Router();

const typesRoutes = () => {
  routes.post("", admValidationMiddleware, createTypeController);

  return routes;
};

export default typesRoutes;
