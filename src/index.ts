import app from "./app";

import defaultConfig from "./shared/config/default";
import dbConnection from "./shared/database/mongoDB";

app.listen(defaultConfig.port, async () => {
  await dbConnection();
  console.log(`Server listen in port ${defaultConfig.port}`);
});
