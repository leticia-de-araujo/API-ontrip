import { Express } from "express";
import accommodationsRoutes from "./accommodations.routes";
import bookingsRoutes from "./bookings.routes";
import sessionRoutes from "./session.routes";
import capacitiesRoutes from "./capacities.routes";
import userRoutes from "./users.routes";
import photosRoutes from "./photos.routes";

const appRoutes = (app: Express) => {
  app.use("/users", userRoutes());
  app.use("/accommodations", accommodationsRoutes());
  app.use("/booking", bookingsRoutes());
  app.use("/login", sessionRoutes());
  app.use("/capacities", capacitiesRoutes());
  app.use("/photos", photosRoutes());
};

export default appRoutes;
