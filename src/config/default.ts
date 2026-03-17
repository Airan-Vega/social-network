import dotenv from "dotenv";
dotenv.config();

const defaultConfig = {
  port: process.env.PORT || 3000,
  database: process.env.DB_CNN,
};

export default defaultConfig;
