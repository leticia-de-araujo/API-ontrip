import { Router } from "express";
import { createAddressController } from "../controllers/addresses/createAddress.controller";

const routes = Router();

const addressesRoutes = () => {
  routes.post("", createAddressController);

  return routes;
};

export default addressesRoutes;
