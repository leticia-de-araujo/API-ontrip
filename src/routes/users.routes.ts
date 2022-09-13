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
import updateUserController from "../controllers/users/updateUser.controller";

const routes = Router();
const userRoutes = () => {
  routes.post(
    "",
    upload.single("files"),
    validateUserCreate(userCreateSchema),
    userCreateController
  );
  routes.get("", listUsersController);
  routes.get("/:id", listOneUserController);
  routes.delete("/:id", deleteUserController);
  routes.patch("/userId", updateUserController);
  return routes;
};

export default userRoutes;
