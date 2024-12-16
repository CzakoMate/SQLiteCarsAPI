import express from "express";
import cors from "cors";
import { initilaizeDB } from "./database.js";
import carsRouter from "./routes/cars.js";
import swaggerUI from "swagger-ui-express";
import { readFile } from "fs/promises";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/cars", carsRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});
const swaggerDocument = JSON.parse(
  await readFile(new URL("./swagger-output.json", import.meta.url))
);
const startServer = async () => {
  await initilaizeDB();
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log("Server listens on port " + PORT);
  });
};
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
startServer();
