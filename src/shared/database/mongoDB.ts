import mongoose from "mongoose";
import defaultConfig from "../config/default";
import { AppError } from "../utils";
import { ERROR_MESSAGES, HTTP_CODES } from "../constants";

async function dbConnection() {
  try {
    await mongoose.connect(defaultConfig.database || "");
    console.log("Conexión DB existosa");
  } catch (error) {
    console.log(error);
    throw new AppError(
      ERROR_MESSAGES.ERROR_CONNECT_DATABASE,
      HTTP_CODES.SERVER_ERROR,
    );
  }
}

export default dbConnection;
