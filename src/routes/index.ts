import { Express } from "express";
import accommodationsRoutes from "./accommodations.routes";
import bookingsRoutes from "./bookings.routes";
<<<<<<< HEAD
import capabilitiesRoutes from "./capabilities.routes";
import sessionRoutes from "./session.routes";
=======
import capacitiesRoutes from "./capacities.routes";
>>>>>>> develop
import userRoutes from "./users.routes";

const appRoutes = (app: Express) => {
  app.use("/users", userRoutes());
  app.use("/accommodations", accommodationsRoutes());
  app.use("/booking", bookingsRoutes());
<<<<<<< HEAD
  app.use("/capabilities", capabilitiesRoutes());
  app.use("/login", sessionRoutes());
=======
  app.use("/capacities", capacitiesRoutes());
>>>>>>> develop
};

export default appRoutes;
