import { Router } from "express";
import fileUpload from "express-fileupload";
import userCreateController from "../controllers/users/userCreate.controller";
import upload from "../utils/multer.middleware";
import {
  userCreateSchema,
  validateUserCreate,
} from "../middlewares/validateUserCreate.middleware";

const routes = Router();
//validateUserCreate(userCreateSchema),
const userRoutes = () => {
  routes.post("", upload.single("files"), userCreateController);
  return routes;
};

export default userRoutes;
