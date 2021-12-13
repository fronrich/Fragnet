"use strict";

import cliProgress from "cli-progress";
import { genDNSHash, getIP } from "./utils/dnsUtils.js";
import { createFragnetSubdir, yarnInit } from "./utils/dirUtils.js";
import * as NodeUtils from "./utils/nodeUtils.js";

const main = () => {
  const args = process.argv.slice(2);
  const nodeType = Number(args[0]) || 0;
  // dir path should be absolute or else fragnet installer will

  /**
   * anonimity
   * 0 - fdcl domain name is the name assigned to your computer's OS
   * 1 - fdcl domain name is custom.
   * 2 - fdcl domain name gives nothing away about the host computer.
   */
  const anonimity = Number(args[1]) || 2;

  const customName = args[2] || "fragnode";

  const installDir = args[3] || "../";

  // define type of node
  const node = NodeUtils.defineNode(nodeType);

  // create a new progress bar instance and use shades_classic theme
  const loadingBar = new cliProgress.SingleBar(
    {
      forceRedraw: "true",
      fps: 5,
    },
    cliProgress.Presets.shades_classic
  );

  // start loading
  loadingBar.start(200, 0);

  console.clear();
  console.log("FRAGNET 1.0.0. Created by Fronrich Puno 2021");

  console.log(`Initializing Fragnet env for node type ${node}`);
  loadingBar.increment(5);

  // Create directory to store node files and save them in path
  const fragnetDir = createFragnetSubdir(installDir, "fragnet");
  loadingBar.increment(5);
  console.log("-", "Installing nodejs modules");
  yarnInit(fragnetDir);

  loadingBar.increment(5);

  console.log("-", "building node");
  const nodeDir = createFragnetSubdir(fragnetDir, "node");
  loadingBar.increment(5);

  // create folder for local oracle and reaper
  console.log("-", "building oracle");
  const oracleDir = createFragnetSubdir(fragnetDir, "oracle");
  loadingBar.increment(5);

  console.log("-", "building reaper");
  const reaperDir = createFragnetSubdir(fragnetDir, "reaper");
  loadingBar.increment(5);

  console.log("Done!\n");

  // create dns for easier querying of nodes
  // TODO: Once a few nodes have been established, consult the oracle before creating more nodes to avoid duplicate addresses
  const anonProtocol = ["Public", "Custom-Aliased", "Private-Aliased"];
  console.log(`Using ${anonProtocol[anonimity]} Protocol to generate domain.`);
  const dns = genDNSHash(node, anonimity, customName);
  loadingBar.increment(5);

  const ip = getIP();
  loadingBar.increment(5);
  console.log("Assigning DNS Address:\n\n- DNS:", dns, "\n- IP:", ip);
  console.log("Done!\n");

  //
};
// Create local security to slash node in case of bad actor

main();
