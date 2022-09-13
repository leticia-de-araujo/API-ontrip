import { Router } from "express";
import listOneUserController from "../controllers/users/listOneUser.controller";
import listUsersController from "../controllers/users/listUsers.controller";
import userCreateController from "../controllers/users/userCreate.controller";
import upload from "../utils/multer.middleware";
import deleteUserController from "../controllers/users/deleteUsers.controller";
import updateUserController from "../controllers/users/updateUser.controller";
import validateUserCreate from "../middlewares/users/validateUserCreate.middleware";
import userCreateSchema from "../schemas/users/userCreate.schema";
import authUserMiddleware from "../middlewares/authentications/authUser.middleware";
import { accountValidationMiddleware } from "../middlewares/authentications/accountValidation.middleware";
import admValidationMiddleware from "../middlewares/authentications/admValidation.middleware";
import admOrOwnerAuthMiddleware from "../middlewares/authentications/admOrOwnerAuth.middleware";
import validateUserUpdate from "../middlewares/users/validateUserUpdate.middleware";
import userPatchSchema from "../schemas/users/userUpdate.schema";

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
