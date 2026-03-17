import defaultConfig from "./config/default";
import app from "./app";
import { dbConnection } from "./database/mongoDB";

app.listen(defaultConfig.port, async () => {
  await dbConnection();
  console.log(`Example app listening on port ${defaultConfig.port}`);
});
