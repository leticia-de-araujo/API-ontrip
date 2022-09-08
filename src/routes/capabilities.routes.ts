import { Router } from "express";
import createCapacityController from "../controllers/capabilities/createCapacity.controller";

const routes = Router();

const capabilitiesRoutes = () => {
  routes.post("", createCapacityController);
  return routes;
};

export default capabilitiesRoutes;
