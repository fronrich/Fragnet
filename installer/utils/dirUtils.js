"use strict";

import { unlink } from "fs";
import { exec as ex } from "child_process";

// exec minus the callback
export const exec = (cmd) => {
  ex(cmd, (error, stdout, stderr) => {});
  return cmd;
};

export const createDir = (path) => {
  exec(`mkdir "${path}"`);
  return path;
};

export const removeDir = (path) => {
  unlink(path, (err) => {
    if (err) throw err;
  });
  return path;
};

// create a subdirectory under the fragnet installation path
export const createFragnetSubdir = (installPath, subDirName) => {
  return createDir(`${installPath}/${subDirName}`);
};

// add yarn modules to directories
export const yarnInit = (path) => {
  exec(`cd "${path}" && yarn add node express`);
};
