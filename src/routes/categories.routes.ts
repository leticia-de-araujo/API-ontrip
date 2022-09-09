import { Router } from "express";
import categoryCreateController from "../controllers/categories/categoryCreate.controller";
import categoryDeleteController from "../controllers/categories/categoryDelete.controller";
import categoryReadAllController from "../controllers/categories/categoryReadAll.controller";
import categoryReadOneController from "../controllers/categories/categoryReadOne.controller";
import { admValidationMiddleware } from "../middlewares/admValidation.middleware";

const routes = Router();

const categoriesRouter = () => {
  routes.post("", admValidationMiddleware, categoryCreateController);
  routes.delete("/:id", admValidationMiddleware, categoryDeleteController);
  routes.get("", admValidationMiddleware, categoryReadAllController);
  routes.get("/:id", admValidationMiddleware, categoryReadOneController);
  return routes;
};

export default categoriesRouter;
