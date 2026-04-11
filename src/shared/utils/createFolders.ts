import fs from "node:fs";

export const createFolders = (folders: string[]) => {
  folders.forEach((folder) => {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
      console.log(`Folder ${folder} created`);
    }
  });
};

export const createFolder = (folder: string) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
    console.log(`Folder ${folder} created`);
  }
};
