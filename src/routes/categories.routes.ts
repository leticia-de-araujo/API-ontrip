import { Router } from "express";
import categoryCreateController from "../controllers/categories/categoryCreate.controller";
import categoryDeleteController from "../controllers/categories/categoryDelete.controller";
import categoryReadAllController from "../controllers/categories/categoryReadAll.controller";
import categoryReadOneController from "../controllers/categories/categoryReadOne.controller";
import categoryUpdateController from "../controllers/categories/categoryUpdate.controller";
import { admValidationMiddleware } from "../middlewares/admValidation.middleware";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const routes = Router();

const categoriesRouter = () => {
  routes.post("", admValidationMiddleware, categoryCreateController);
  routes.delete("/:id", admValidationMiddleware, categoryDeleteController);
  routes.get("", authUserMiddleware, categoryReadAllController);
  routes.get("/:id", authUserMiddleware, categoryReadOneController);
  routes.patch("/:id", admValidationMiddleware, categoryUpdateController);
  return routes;
};

export default categoriesRouter;
