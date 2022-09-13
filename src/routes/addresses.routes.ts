import { Router } from "express";
import { createAddressController } from "../controllers/addresses/createAddress.controller";
import { updateAddressController } from "../controllers/addresses/updateAddress.controller";
import { accountValidationMiddleware } from "../middlewares/authentications/accountValidation.middleware";
import admOrOwnerAuthMiddleware from "../middlewares/authentications/admOrOwnerAuth.middleware";
import authUserMiddleware from "../middlewares/authentications/authUser.middleware";

const routes = Router();

const addressesRoutes = () => {
  routes.post(
    "",
    authUserMiddleware,
    accountValidationMiddleware,
    createAddressController
  );
  routes.patch(
    "/:id",
    authUserMiddleware,
    accountValidationMiddleware,
    admOrOwnerAuthMiddleware,
    updateAddressController
  );

  return routes;
};

export default addressesRoutes;
