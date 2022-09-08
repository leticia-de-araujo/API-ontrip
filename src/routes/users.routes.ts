import { Router } from "express";
import fileUpload from "express-fileupload";
import listUsersController from "../controllers/users/listUsers.controller";
import userCreateController from "../controllers/users/userCreate.controller";
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
  return routes;
};

export default userRoutes;
