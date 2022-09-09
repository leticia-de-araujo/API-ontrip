import { Router } from "express";
import accommodationCreateController from "../controllers/accommodations/accommodationCreate.controller";
import accommodationReadAllController from "../controllers/accommodations/accommodationReadAll.controller";
import accommodationReadOneController from "../controllers/accommodations/accommodationReadOne.controller";
import accommodationUpdateController from "../controllers/accommodations/accommodationUpdate.controller";
import { admValidationMiddleware } from "../middlewares/admValidation.middleware";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const routes = Router();

const accommodationsRoutes = () => {
  routes.post("", authUserMiddleware, accommodationCreateController);
  routes.get("", accommodationReadAllController);
  routes.get("/:id", authUserMiddleware, accommodationReadOneController);
  routes.patch(":/id", authUserMiddleware, accommodationUpdateController);
  return routes;
};

export default accommodationsRoutes;
