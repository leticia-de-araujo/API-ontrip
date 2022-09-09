import { Router } from "express";
import { createPhotoController } from "../controllers/photo/createPhoto.controller";
import { listAllPhotoAccommodationController } from "../controllers/photo/listAllPhotoAccommodation.controller";
import { lisOnePhotoController } from "../controllers/photo/listOnePhoto.controller";
import { softDeletePhotoController } from "../controllers/photo/softDeletePhoto.controller";
import { admOrOwnerAuthMiddleware } from "../middlewares/admOrOwnerAuth.middleware";
import { authUserMiddleware } from "../middlewares/authUser.middleware";
import upload from "../utils/multer.middleware";

const routes = Router();

const photosRoutes = () => {
  routes.post(
    "/:accommodationId",
    authUserMiddleware,
    admOrOwnerAuthMiddleware,
    upload.single("files"),
    createPhotoController
  );
  routes.get("/:photoId", lisOnePhotoController);
  routes.get("/:accommodationId", listAllPhotoAccommodationController);
  routes.delete(
    "/:photoId",
    authUserMiddleware,
    admOrOwnerAuthMiddleware,
    softDeletePhotoController
  );

  return routes;
};

export default photosRoutes;
