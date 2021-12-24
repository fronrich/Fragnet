// run a node on a singular thread
import { importJSON } from "../../../apis/dataAPIs.js";
import { removeDir } from "../../../utils/dirUtils.js";
import process from "process";
import Node from "./node.mjs";
const config = importJSON("./config.json");
const thread = () => {
  const args = process.argv.slice(2);
  const id = Number(args[0]) || 0;
  const path = args[1];
  const { nodeType, address, creationDate, maxTransactions, schemaDir } =
    config;

  const node = new Node(
    nodeType,
    address,
    creationDate,
    maxTransactions,
    id,
    path,
    schemaDir
  );
  // do the processing
  const payload = node.processData();

  // send the package
  // TODO: send the package

  // delete the file
  removeDir(path);

  // indicate that I'm done
  process.stdout.write(`${thread} done.`);
};

thread();
