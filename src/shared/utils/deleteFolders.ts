import fs from "node:fs";

export const deleteFolders = (folders: string[]) => {
  folders.forEach((folder) => {
    if (fs.existsSync(folder)) {
      fs.rmSync(folder, { recursive: true, force: true });
      console.log(`Folder ${folder} deleted`);
    } else {
      console.log(`Folder ${folder} does not exist`);
    }
  });
};

export const deleteFolder = (folder: string) => {
  if (fs.existsSync(folder)) {
    fs.rmSync(folder, { recursive: true, force: true });
    console.log(`Folder ${folder} deleted`);
  } else {
    console.log(`Folder ${folder} does not exist`);
  }
};
