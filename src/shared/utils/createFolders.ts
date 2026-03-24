import fs from "node:fs";
import defaultConfig from "../config/default";

export const createFolders = () => {
  const folders = [defaultConfig.uploadFolder];

  folders.forEach((folder) => {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
      console.log(`Folder ${folder} created`);
    }
  });
};
