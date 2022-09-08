import "reflect-metadata";
import express, { Request, Response } from "express";
import appRoutes from "./routes";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import fileupload from "express-fileupload";
import "express-async-errors";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message:
      "Welcome! This API was developed for the final project of the 4th module of the Kenzie Academy Brasil fullstack development course for class 11. Enjoy the other routes!",
  });
});

app.use(fileupload());
appRoutes(app);
app.use(handleErrorMiddleware);

export default app;
