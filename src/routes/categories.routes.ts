import { Router } from "express";
import categoryCreateController from "../controllers/categories/categoryCreate.controller";
import categoryDeleteController from "../controllers/categories/categoryDelete.controller";
import categoryReadAllController from "../controllers/categories/categoryReadAll.controller";
import { admValidationMiddleware } from "../middlewares/admValidation.middleware";

const routes = Router();

const categoriesRouter = () => {
  routes.post("", admValidationMiddleware, categoryCreateController);
  routes.delete("/:id", admValidationMiddleware, categoryDeleteController);
  routes.get("", admValidationMiddleware, categoryReadAllController);
  return routes;
};

export default categoriesRouter;
