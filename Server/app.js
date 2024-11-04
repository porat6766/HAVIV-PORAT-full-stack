import express from "express";
import morgan from "morgan";
import jokeRoute from "./routes/jokesRoute.js";
import productRoute from "./routes/productsRoute.js";
import usersRoute from "./routes/usersRouts.js";
import logRequest from "./middleware/logger.js";
import handleEror from "./middleware/handleEror.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const uri = process.env.DB_ULI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("connected mongoDBserver");
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(morgan("short"));

app.use(logRequest);
app.use(handleEror);

app.get("/", (req, res) => {
  res.send("Home-page");
});

//general check status
app.get("/api/status", (req, res) => {
  res.send({ status: "server is running" });
});

app.use("/api/jokes", jokeRoute);
app.use("/api/products", productRoute);
app.use("/api/users", usersRoute);

//liseten
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
