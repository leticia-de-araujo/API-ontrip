import "reflect-metadata";
import express, { Request, Response } from "express";
import appRoutes from "./routes";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/errors/handleError.middleware";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message:
      "Welcome! This API was developed for the final project of the 4th module of the Kenzie Academy Brasil fullstack development course for class 11. Enjoy the other routes!",
  });
});

appRoutes(app);

app.use(handleErrorMiddleware);

export default app;
