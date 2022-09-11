import { Router } from "express";
import { createAddressController } from "../controllers/addresses/createAddress.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const routes = Router();

const addressesRoutes = () => {
  routes.post("", authUserMiddleware, createAddressController);

  return routes;
};

export default addressesRoutes;
