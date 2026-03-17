import mongoose from "mongoose";
import defaultConfig from "../config/default";

export async function dbConnection() {
  try {
    await mongoose.connect(defaultConfig.database || "");
    console.log("Conexión DB existosa");
  } catch (error) {
    console.log(error);
    throw new Error("Error al conectarse a la base de datos, ver Logs");
  }
}
