import { Router } from "express";
import { loginController } from "../controllers/session/login.controller";

const routes = Router();

const loginRoutes = () => {
  routes.post("/", loginController);

  return routes;
};

export default loginRoutes;
