import { Router } from "express";
import fileUpload from "express-fileupload";
import listUsersController from "../controllers/users/listUsers.controller";
import userCreateController from "../controllers/users/userCreate.controller";
import upload from "../utils/multer.middleware";
import {
  userCreateSchema,
  validateUserCreate,
} from "../middlewares/validateUserCreate.middleware";
import { photoVerifyMiddleware } from "../middlewares/photoVerify.middleware";

const routes = Router();
//validateUserCreate(userCreateSchema),
const userRoutes = () => {
  routes.post("", upload.single("files"), userCreateController);
  routes.get("", listUsersController);
  return routes;
};

export default userRoutes;
