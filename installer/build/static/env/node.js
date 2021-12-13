// this file will  be edited based on the type of node used
import { importJSON } from "../../../apis/dataAPIs.js";
import Client from "./nodes/Client/ClientClass.js";
const config = importJSON("./config.json");

const nodes = [Client];
const Node = nodes[config.nodeType];
export default Node;
