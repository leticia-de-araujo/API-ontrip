import app from "./app";
import "dotenv/config";
import AppDataSource from "./data-source";

const init = async () => {
  const PORT = process.env.PORT || 3000;

  await AppDataSource.initialize()
    .then(() => {
      console.log("Data Source initialized");
    })
    .catch((err: any) => {
      console.error("Error during Data Source initialization", err);
    });

  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
};

init();
