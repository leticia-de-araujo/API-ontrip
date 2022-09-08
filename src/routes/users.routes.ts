import { Router } from "express";
import fileUpload from "express-fileupload";
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
  return routes;
};

export default userRoutes;
