import { Router } from "express";
import accommodationDeleteController from "../controllers/accommodations/accommodationDelete.controller";
import accommodationCreateController from "../controllers/accommodations/accommodationCreate.controller";
import accommodationReadAllController from "../controllers/accommodations/accommodationReadAll.controller";
import accommodationReadOneController from "../controllers/accommodations/accommodationReadOne.controller";
import accommodationUpdateController from "../controllers/accommodations/accommodationUpdate.controller";
import { authUserMiddleware } from "../middlewares/authUser.middleware";
import {
  accommodationCreateSchema,
  validateAccommodationCreate,
} from "../middlewares/validateAccommodationCreate.middleware";
import { admOrOwnerAuthMiddleware } from "../middlewares/admOrOwnerAuth.middleware";
import {
  accommodationPatchSchema,
  validateAccommodationPatch,
} from "../middlewares/validateAccommodationPatch";

const routes = Router();

const accommodationsRoutes = () => {
  routes.post(
    "",
    validateAccommodationCreate(accommodationCreateSchema),
    authUserMiddleware,
    accommodationCreateController
  );
  routes.get("", accommodationReadAllController);
  routes.get("/:id", accommodationReadOneController);
  routes.patch(
    "/:id",
    authUserMiddleware,
    admOrOwnerAuthMiddleware,
    validateAccommodationPatch(accommodationPatchSchema),
    accommodationUpdateController
  );
  routes.delete(
    "/:id",
    authUserMiddleware,
    admOrOwnerAuthMiddleware,
    accommodationDeleteController
  );
  return routes;
};

export default accommodationsRoutes;
