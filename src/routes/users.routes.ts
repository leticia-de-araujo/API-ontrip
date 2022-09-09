import { Router } from "express";
import fileUpload from "express-fileupload";
import listOneUserController from "../controllers/users/listOneUser.controller";
import listUsersController from "../controllers/users/listUsers.controller";
import userCreateController from "../controllers/users/userCreate.controller";
import upload from "../utils/multer.middleware";
import {
  userCreateSchema,
  validateUserCreate,
} from "../middlewares/validateUserCreate.middleware";
import deleteUserController from "../controllers/users/deleteUsers.controller";

const routes = Router();
//validateUserCreate(userCreateSchema),
const userRoutes = () => {
  routes.post("", upload.single("files"), userCreateController);
  routes.get("", listUsersController);
  routes.get("/:id", listOneUserController);
  routes.delete("/:id", deleteUserController);
  return routes;
};

export default userRoutes;
