import express from "express";
import chokidar from "chokidar";
import { exec } from "../../../utils/dirUtils.js";
import { importJSON } from "../../../apis/dataAPIs.js";
import cliProgress from "cli-progress";
import process from "process";
import { exec as createThread } from "child_process";
import opn from "opn";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

// import utils
import * as Utils from "./vmUtils.js";

const {
  corsOptions,
  init,
  currentDateTime,
  header,
  onAddServer,
  onAddContainer,
} = Utils;

// deconstruct the config
const config = importJSON("./config.json");
const {
  rootPort,
  whitelist,
  nodeDir,
  guiDir,
  queueDir,
  nodeType,
  address,
  creationDate,
  maxTransactions,
  maxClients,
  schemaDir,
} = config;

const vm = async (port, queueDir) => {
  // read variables from terminal
  const mode = init();
  const liteMode = mode === "lite";

  // load monitoring
  // create a new progress bar instance and use shades_classic theme
  const usage = new cliProgress.MultiBar(
    {
      forceRedraw: "false",
      fps: 30,
      format: "{name} {bar} {value}/{total}",
    },
    cliProgress.Presets.shades_classic
  );

  // start loading
  let maxTrans = maxTransactions;
  const loadingBar = usage.create(maxTrans, 0, { name: "Threads" });
  const clients = usage.create(maxClients, 0, { name: "Clients" });

  loadingBar.update(0, {
    format: "progress {bar} {percentage}% | ETA: {eta}s | {value}/{total}",
  });

  console.clear();

  // debug code
  if (mode === "debug") {
    console.log("debug mode");
    createThread(`node debug.js "${queueDir}"`, (error, stdout, stderr) => {
      if (error) throw error;
    });
  }

  // Initialize watcher
  // detects state changes in vm
  const importWatcher = chokidar.watch(queueDir, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
  });

  const app = express();
  let threads = [];
  const log = console.log.bind(console);
  // app.set("trust proxy", true);

  // set up server
  const server = createServer(app);

  if (!liteMode) {
    // app.use(cors(corsOptions));
    app.get("/", (req, res) => {
      res.json({ threads: threads });
    });

    const io = new Server(server, {
      cors: corsOptions(whitelist),
    });
    io.on("connection", (socket) => {
      clients.increment(1);

      // SOCKET COMMANDS
      // this is here for debugging purposes
      socket.on("debug", () => {
        socket.emit("debug-log", { status: "running in background" });
        createThread(`node debug.js "${queueDir}"`, (error, stdout, stderr) => {
          if (error) throw error;
          stdout && socket.emit("debug-log", { status: "complete" });
        });
      });

      socket.on("request-config", () => {
        socket.emit("return-config", config);
      });

      socket.on("disconnect", () => {
        clients.increment(-1);
      });
    });
  }

  server.listen(port, () => {
    // log time
    const execTime = currentDateTime();

    // display the header
    header(execTime, config, log, server, liteMode);
    // const threads = [];

    // Something to use when events are received.
    // Add event listeners.
    importWatcher
      .on("add", (path) =>
        onAddServer(path, threads, execTime, loadingBar, queueDir)
      )
      .on("change", (path) => {})
      .on("unlink", (path) => {});
  });

  // process kill signals
  process.on("SIGINT", () => {
    usage.stop();
    console.clear();
    log("Running Threads have finished execution.");
    log("Shutting Down Fragnet...");
    // wait for threads to equal 0
    log("Closing Port...");
    // TODO: terminate subprocesses using SSH connections
    importWatcher.close();
    log("Deleting app Instance...");
    server.close();
    io.close();
    log("Goodbye :)");
    process.exit();
  });
};

await vm(rootPort, queueDir);
