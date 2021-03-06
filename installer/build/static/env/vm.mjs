import express from "express";
import chokidar from "chokidar";
import { exec } from "../../../utils/dirUtils.js";
import { importJSON } from "../../../apis/dataAPIs.js";
import cliProgress from "cli-progress";
import process from "process";
import { exec as createThread } from "child_process";
import { createServer } from "http";
import { Server } from "socket.io";
import { ioAPI } from "./io.mjs";

// import utils
import * as Utils from "./vmUtils.mjs";

const {
  corsOptions,
  init,
  currentDateTime,
  header,
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
  // log time since program execution
  const execTime = currentDateTime();

  // read variables from terminal
  const mode = init();
  const liteMode = mode === "lite";

  // load monitoring
  // create a new progress bar instance and use shades_classic theme
  let usage;
  if(liteMode) {

    usage = new cliProgress.MultiBar(
      {
        forceRedraw: "false",
        fps: 30,
        format: "{name} {bar} {value}/{total}",
      },
      cliProgress.Presets.shades_classic
    );
  }

  // start loading
  let maxTrans = maxTransactions;
  let loadingBar, clients;
  if (liteMode) {
    loadingBar = usage.create(maxTrans, 0, { name: "Threads" });
    clients = usage.create(maxClients, 0, { name: "Clients" });
    console.clear();
  }

  // debug code
  if (mode === "debug") {
    console.log("debug mode");
    createThread(`node debug.mjs "${queueDir}"`, (error, stdout, stderr) => {
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

  let io;

  // Something to use when events are received.
  // Add event listeners.
  let activeThreads = 0;

  if (!liteMode) {
    // app.use(cors(corsOptions));
    // app.get("/", (req, res) => {
    //   res.json({ threads: threads });
    // });

    // State Syncing Stuff
    
    io = new Server(server, {
      cors: corsOptions(whitelist),
    });

    // run socket
    ioAPI(io)
  }

  server.listen(port, () => {
    // display the header
    header(execTime, config, log, server, liteMode);
    // const threads = [];

    importWatcher
      .on("add", (path) => {
        const genID = () => {
          const id =
            "0x" +
            parseInt(Math.random() * (1 << 30).toString(10)).toString(16);
          if (threads.includes(id)) {
            id = genID();
          }
          return id;
        };
        const id = genID();
        // add load
        activeThreads += 1;
        liteMode && loadingBar.increment(1);
        const alertDebug = setInterval(
          () =>
            io.emit("active-threads", {
              activeThreads: activeThreads,
              threads: id,
            }),
          100
        );

        // log file
        const logEntry = `${path} | ${currentDateTime()}`;
        exec(`echo "${logEntry}" >> ${queueDir}.session-${execTime}.log`);
        threads.push(id);

        // Create a thread using exec from child process
        // log(`Processing File on thread ${id}`);
        createThread(
          `node thread.mjs "${id}" "${path}"`,
          (error, stdout, stderr) => {
            if (error) {
              throw error;
            }
            activeThreads -= 1;
            liteMode && loadingBar.increment(-1);
            clearInterval(alertDebug);
          }
        );

        // delete from thread list
        for (var i = 0; i < threads.length; i++) {
          if (threads[i] === id) {
            threads.splice(i--, 1);
          }
        }
      })
      .on("change", (path) => {})
      .on("unlink", (path) => {});
  });

  // process kill signals
  process.on("SIGINT", () => {
    liteMode && usage.stop();
    console.clear();
    log("Running Threads have finished execution.");
    log("Shutting Down Fragnet...");
    // wait for threads to equal 0
    log("Closing Port...");
    // TODO: terminate subprocesses using SSH connections
    importWatcher.close();
    log("Deleting app Instance...");

    // alert frontend that connection has been closed
    io.emit("close");
    server.close();
    // io.off();
    log("Goodbye :)");
    process.exit();
  });
};

await vm(rootPort, queueDir);
