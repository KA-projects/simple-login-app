import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/userRoute.js";
import mongoose from "mongoose";

import { config } from "dotenv";

const app = express();

config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/login", router);

const port = 5000;

const runServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "ant-form",
    });

    app.listen(port, () => console.log("Server run on  port: " + port));
  } catch (error) {
    console.error(error);
  }
};

runServer();

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("disconnect!!!");
  process.exit();
});
