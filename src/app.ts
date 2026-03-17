import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
// Help protect Express applications by configuring HTTP response headers.
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
