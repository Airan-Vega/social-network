import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { router } from "./routes";
import { errorHandlerMiddleware } from "./shared/middleware/errorHandler.middleware";

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet()); // Help protect Express applications by configuring HTTP response headers.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.use(errorHandlerMiddleware);

export default app;
