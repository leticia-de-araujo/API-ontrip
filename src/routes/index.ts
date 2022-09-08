import { Express } from "express";
import accommodationsRoutes from "./accommodations.routes";
import bookingsRoutes from "./bookings.routes";
import capacitiesRoutes from "./capacities.routes";
import userRoutes from "./users.routes";

const appRoutes = (app: Express) => {
  app.use("/users", userRoutes());
  app.use("/accommodations", accommodationsRoutes());
  app.use("/booking", bookingsRoutes());
  app.use("/capacities", capacitiesRoutes());
};

export default appRoutes;
