import { Router } from "express";
import accommodationCreateController from "../controllers/accommodations/accommodationCreate.controller";
import accommodationReadAllController from "../controllers/accommodations/accommodationReadAll.controller";
import accommodationReadOneController from "../controllers/accommodations/accommodationReadOne.controller";
import { admValidationMiddleware } from "../middlewares/admValidation.middleware";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const routes = Router();

const accommodationsRoutes = () => {
  routes.post("", authUserMiddleware, accommodationCreateController);
  routes.get("", accommodationReadAllController);
  routes.get("/:id", authUserMiddleware, accommodationReadOneController);
  return routes;
};

export default accommodationsRoutes;
