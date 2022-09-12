import { Express } from "express";
import accommodationsRoutes from "./accommodations.routes";
import bookingsRoutes from "./bookings.routes";
import sessionRoutes from "./session.routes";
import capacitiesRoutes from "./capacities.routes";
import typesRoutes from "./types.routes";
import userRoutes from "./users.routes";
import photosRoutes from "./photos.routes";
import categoriesRouter from "./categories.routes";
import addressesRoutes from "./addresses.routes";

const appRoutes = (app: Express) => {
  app.use("/users", userRoutes());
  app.use("/accommodations", accommodationsRoutes());
  app.use("/bookings", bookingsRoutes());
  app.use("/login", sessionRoutes());
  app.use("/capacities", capacitiesRoutes());
  app.use("/types", typesRoutes());
  app.use("/photos", photosRoutes());
  app.use("/categories", categoriesRouter());
  app.use("/addresses", addressesRoutes());
};

export default appRoutes;
