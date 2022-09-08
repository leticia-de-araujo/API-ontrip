import { Router } from "express";
import { admValidationMiddleware } from "../middlewares/admValidation.middleware";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const routes = Router();

const bookingsRoutes = () => {
  routes.post("", authUserMiddleware, bookingsRoutes);
  routes.patch("", authUserMiddleware, bookingsRoutes);
  routes.get("", admValidationMiddleware, bookingsRoutes);
  routes.delete("", admValidationMiddleware, bookingsRoutes);
  return routes;
};

export default bookingsRoutes;
