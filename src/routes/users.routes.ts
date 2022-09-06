import { Router } from "express";
import userCreateController from "../controllers/users/userCreate.controller";
import {
  userCreateSchema,
  validateUserCreate,
} from "../middlewares/validateUserCreate.middleware";

const routes = Router();

const userRoutes = () => {
  routes.post("", validateUserCreate(userCreateSchema), userCreateController);
  return routes;
};

export default userRoutes;
