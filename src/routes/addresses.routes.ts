import { Router } from "express";
import { createAddressController } from "../controllers/addresses/createAddress.controller";
import { updateAddressController } from "../controllers/addresses/updateAddress.controller";
import { admOrOwnerAuthMiddleware } from "../middlewares/admOrOwnerAuth.middleware";
import { authUserMiddleware } from "../middlewares/authUser.middleware";

const routes = Router();

const addressesRoutes = () => {
  routes.post("", authUserMiddleware, createAddressController);
  routes.patch(
    "/:id",
    authUserMiddleware,
    admOrOwnerAuthMiddleware,
    updateAddressController
  );

  return routes;
};

export default addressesRoutes;
