import React from "react";
import {
  BsFillFileEarmarkBinaryFill,
  BsFillFileEarmarkImageFill,
  BsFolderFill,
  BsFillFileEarmarkSlidesFill,
  BsFillFileEarmarkTextFill,
  BsFillFileEarmarkZipFill,
} from "react-icons/bs";

const Diricon = (absPath) => {
  let fileName = absPath.split("/");
  fileName = fileName[fileName.length - 1];

  let ext = fileName.split(".");
  ext = ext[ext.length - 1];

  let Symbol;
  switch (ext) {
    case "eff":
      Symbol = BsFillFileEarmarkBinaryFill;
      break;
    case "zip":
      Symbol = BsFillFileEarmarkZipFill;
      break;
    default:
      Symbol = BsFillFileEarmarkTextFill;
      break;
  }
  return (
    <div>
      <Symbol />
    </div>
  );
};

export default Diricon;
