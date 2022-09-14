import { Router } from "express";
import categoryCreateController from "../controllers/categories/createCategory.controller";
import categoryDeleteController from "../controllers/categories/deleteCategory.controller";
import categoryReadAllController from "../controllers/categories/listCategories.controller";
import categoryReadOneController from "../controllers/categories/listOneCategory.controller";
import categoryUpdateController from "../controllers/categories/updateCategory.controller";
import { accountValidationMiddleware } from "../middlewares/authentications/accountValidation.middleware";
import admValidationMiddleware from "../middlewares/authentications/admValidation.middleware";
import authUserMiddleware from "../middlewares/authentications/authUser.middleware";

const routes = Router();

const categoriesRouter = () => {
  routes.post(
    "",
    authUserMiddleware,
    accountValidationMiddleware,
    admValidationMiddleware,
    categoryCreateController
  );
  routes.get("", categoryReadAllController);
  routes.get("/:id", categoryReadOneController);
  routes.patch(
    "/:id",
    authUserMiddleware,
    accountValidationMiddleware,
    admValidationMiddleware,
    categoryUpdateController
  );
  routes.delete(
    "/:id",
    authUserMiddleware,
    accountValidationMiddleware,
    admValidationMiddleware,
    categoryDeleteController
  );

  return routes;
};

export default categoriesRouter;
