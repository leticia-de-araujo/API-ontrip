import { Router } from "express";
import { createPhotoController } from "../controllers/photo/createPhoto.controller";
import { lisOnePhotoController } from "../controllers/photo/listOnePhoto.controller";
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
  ); // ajustar o middleware admOrOwnerAuthMiddleware para a rota de photos
  routes.get("/:photoId", lisOnePhotoController);

  return routes;
};

export default photosRoutes;
