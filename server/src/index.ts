import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./router/authRouter.ts";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import { config } from "dotenv";
import { errorMiddleware } from "./middleware/error-middleware.ts";

const app = express();

config();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

app.use("/auth", router);

app.use(errorMiddleware);

// Проверка емайл
// Пароль мин 8 макс 25
// Хотя бы один апперкейс пароль
// class-validator

const port = 5000;

const runServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!, {
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
