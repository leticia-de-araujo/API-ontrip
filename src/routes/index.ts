import { Express } from "express";
import accommodationsRoutes from "./accommodations.routes";
import bookingsRoutes from "./bookings.routes";
import capabilitiesRoutes from "./capabilities.routes";
import sessionRoutes from "./session.routes";
import userRoutes from "./users.routes";

const appRoutes = (app: Express) => {
  app.use("/users", userRoutes());
  app.use("/accommodations", accommodationsRoutes());
  app.use("/booking", bookingsRoutes());
  app.use("/capabilities", capabilitiesRoutes());
  app.use("/login", sessionRoutes());
};

export default appRoutes;
