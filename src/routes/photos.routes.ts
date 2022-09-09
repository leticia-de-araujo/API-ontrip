import { Router } from "express";
import { createPhotoController } from "../controllers/photo/createPhoto.controller";
import { admOrOwnerAuthMiddleware } from "../middlewares/admOrOwnerAuth.middleware";
import upload from "../utils/multer.middleware";

const routes = Router();

const photosRoutes = () => {
  routes.post(
    "/:accommodationId",
    admOrOwnerAuthMiddleware,
    upload.single("files"),
    createPhotoController
  );

  return routes;
};

export default photosRoutes;
