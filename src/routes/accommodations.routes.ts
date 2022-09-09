import { Router } from "express";
import accommodationCreateController from "../controllers/accommodations/accommodationCreate.controller";
import accommodationReadAllController from "../controllers/accommodations/accommodationReadAll.controller";
import { admValidationMiddleware } from "../middlewares/admValidation.middleware";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const routes = Router();

const accommodationsRoutes = () => {
  routes.post("", accommodationCreateController);
  routes.get("", accommodationReadAllController);
  return routes;
};

export default accommodationsRoutes;
