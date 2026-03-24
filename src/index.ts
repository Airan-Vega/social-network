import app from "./app";

import defaultConfig from "./shared/config/default";
import dbConnection from "./shared/database/mongoDB";
import { createFolders } from "./shared/utils";

app.listen(defaultConfig.port, async () => {
  createFolders();
  await dbConnection();
  console.log(`Server listen in port ${defaultConfig.port}`);
});
