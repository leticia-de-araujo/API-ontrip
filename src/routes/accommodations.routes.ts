import { Router } from "express";
import accommodationDeleteController from "../controllers/accommodations/accommodationDelete.controller";
import accommodationCreateController from "../controllers/accommodations/accommodationCreate.controller";
import accommodationReadAllController from "../controllers/accommodations/accommodationReadAll.controller";
import accommodationReadOneController from "../controllers/accommodations/accommodationReadOne.controller";
import accommodationUpdateController from "../controllers/accommodations/accommodationUpdate.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const routes = Router();

const accommodationsRoutes = () => {
  routes.post("", authUserMiddleware, accommodationCreateController);
  routes.get("", accommodationReadAllController);
  routes.get("/:id", accommodationReadOneController);
  routes.patch("/:id", authUserMiddleware, accommodationUpdateController);
  routes.delete("/:id", authUserMiddleware, accommodationDeleteController);
  return routes;
};

export default accommodationsRoutes;
