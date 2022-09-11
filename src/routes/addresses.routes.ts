import { Router } from "express";
import { createAddressController } from "../controllers/addresses/createAddress.controller";
import { listAllAddressesController } from "../controllers/addresses/listAllAddresses.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const routes = Router();

const addressesRoutes = () => {
  routes.post("", authUserMiddleware, createAddressController);
  routes.get("", authUserMiddleware, listAllAddressesController);

  return routes;
};

export default addressesRoutes;
