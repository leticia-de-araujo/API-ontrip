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
import { authUserMiddleware } from "../middlewares/authUser.middleware";
import { admValidationMiddleware } from "../middlewares/admValidation.middleware";
import { admOrOwnerAuthMiddleware } from "../middlewares/admOrOwnerAuth.middleware";
import {
  userPatchSchema,
  validateUserUpdate,
} from "../middlewares/validateUserUpdate.middleware";
import { accountValidationMiddleware } from "../middlewares/accountValidation. middleware";

const routes = Router();

const userRoutes = () => {
  routes.post(
    "",
    upload.single("files"),
    validateUserCreate(userCreateSchema),
    userCreateController
  );
  routes.get(
    "",
    authUserMiddleware,
    accountValidationMiddleware,
    admValidationMiddleware,
    listUsersController
  );
  routes.get(
    "/:id",
    authUserMiddleware,
    accountValidationMiddleware,
    admOrOwnerAuthMiddleware,
    listOneUserController
  );
  routes.patch(
    "/:id",
    authUserMiddleware,
    accountValidationMiddleware,
    admOrOwnerAuthMiddleware,
    validateUserUpdate(userPatchSchema),
    updateUserController
  );
  routes.delete(
    "/:id",
    authUserMiddleware,
    accountValidationMiddleware,
    admOrOwnerAuthMiddleware,
    deleteUserController
  );
  return routes;
};

export default userRoutes;
