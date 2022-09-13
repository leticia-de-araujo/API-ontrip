import { Router } from "express";
import accommodationDeleteController from "../controllers/accommodations/accommodationDelete.controller";
import accommodationCreateController from "../controllers/accommodations/accommodationCreate.controller";
import accommodationReadAllController from "../controllers/accommodations/accommodationReadAll.controller";
import accommodationReadOneController from "../controllers/accommodations/accommodationReadOne.controller";
import accommodationUpdateController from "../controllers/accommodations/accommodationUpdate.controller";
import validateAccommodationCreate from "../middlewares/accommodations/validateAccommodationCreate.middleware";
import accommodationCreateSchema from "../schemas/accommodations/accommodationCreate.schema";
import authUserMiddleware from "../middlewares/authentications/authUser.middleware";
import { accountValidationMiddleware } from "../middlewares/authentications/accountValidation.middleware";
import admOrOwnerAuthMiddleware from "../middlewares/authentications/admOrOwnerAuth.middleware";
import validateAccommodationPatch from "../middlewares/accommodations/validateAccommodationPatch";
import accommodationPatchSchema from "../schemas/accommodations/accommodationUpdate.schema";

const routes = Router();

const accommodationsRoutes = () => {
  routes.post(
    "",
    validateAccommodationCreate(accommodationCreateSchema),
    authUserMiddleware,
    accountValidationMiddleware,
    accommodationCreateController
  );
  routes.get("", accommodationReadAllController);
  routes.get("/:id", accommodationReadOneController);
  routes.patch(
    "/:id",
    authUserMiddleware,
    accountValidationMiddleware,
    admOrOwnerAuthMiddleware,
    validateAccommodationPatch(accommodationPatchSchema),
    accommodationUpdateController
  );
  routes.delete(
    "/:id",
    authUserMiddleware,
    accountValidationMiddleware,
    admOrOwnerAuthMiddleware,
    accommodationDeleteController
  );
  return routes;
};

export default accommodationsRoutes;
