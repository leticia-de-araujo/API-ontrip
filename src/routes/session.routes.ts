import { Router } from "express";
import { loginController } from "../controllers/session/login.controller";

const routes = Router();

const sessionRoutes = () => {
  routes.post("/", loginController);

  return routes;
};

export default sessionRoutes;
