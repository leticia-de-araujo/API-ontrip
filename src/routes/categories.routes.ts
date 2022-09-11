import { Router } from "express";

import categoryCreateController from "../controllers/categories/createCategory.controller";
import categoryDeleteController from "../controllers/categories/deleteCategory.controller";
import categoryReadAllController from "../controllers/categories/listCategories.controller";
import categoryReadOneController from "../controllers/categories/listOneCategory.controller";
import categoryUpdateController from "../controllers/categories/updateCategory.controller";

import { admValidationMiddleware } from "../middlewares/admValidation.middleware";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const routes = Router();

const categoriesRouter = () => {
  routes.post(
    "",
    authUserMiddleware,
    admValidationMiddleware,
    categoryCreateController
  );
  routes.get("", categoryReadAllController);
  routes.get("/:id", categoryReadOneController);
  routes.patch(
    "/:id",
    authUserMiddleware,
    admValidationMiddleware,
    categoryUpdateController
  );
  routes.delete(
    "/:id",
    authUserMiddleware,
    admValidationMiddleware,
    categoryDeleteController
  );

  return routes;
};

export default categoriesRouter;
