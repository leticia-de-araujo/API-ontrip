import { Router } from "express";
import fileUpload from "express-fileupload";
import listOneUserController from "../controllers/users/listOneUser.controller";
import listUsersController from "../controllers/users/listUsers.controller";
import userCreateController from "../controllers/users/userCreate.controller";
import { admValidationMiddleware } from "../middlewares/admValidation.middleware";
import { authUserMiddleware } from "../middlewares/authUser.middleware";
import fileExistsHandlerMiddleware from "../middlewares/fileExistsHandler.middleware";
import fileExtensionHandlerMiddleware from "../middlewares/fileExtensionHandler.middleware";
import fileLimiterHandlerMiddleware from "../middlewares/fileLimiterHandler.middleware";
import {
  userCreateSchema,
  validateUserCreate,
} from "../middlewares/validateUserCreate.middleware";

const routes = Router();
//validateUserCreate(userCreateSchema),
const userRoutes = () => {
  routes.post(
    "",
    fileExistsHandlerMiddleware,
    fileExtensionHandlerMiddleware,
    fileLimiterHandlerMiddleware,
    userCreateController
  );
  routes.get("", listUsersController);
  routes.get("/:id", listOneUserController);
  return routes;
};

export default userRoutes;
