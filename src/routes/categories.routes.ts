import { Router } from "express";
import createCategoryController from "../controllers/categories/createCategory.controller";
import { admValidationMiddleware } from "../middlewares/admValidation.middleware";

const routes = Router();

const categoriesRouter = () => {
  routes.post("", admValidationMiddleware, createCategoryController);
};

export default categoriesRouter;
