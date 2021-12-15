import { exec } from "../../../utils/dirUtils.js";
import process from "process";
import { exec as createThread } from "child_process";
import opn from "opn";

// fetch permissioning
export const corsOptions = (whitelist) => {
  return {
    origin: (origin, callback) => {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };
};

// terminal variables
export const init = () => {
  const args = process.argv.slice(2);

  // litemode disables html gui
  const mode = args[0];
  return mode;
};

// get the current time
export const currentDateTime = () => {
  const time = new Date();
  const cDate = () =>
    `${time.getFullYear()}.${time.getMonth() + 1}.${time.getDate()}`;
  const cTime = () =>
    time.getHours() +
    ":" +
    time.getMinutes() +
    ":" +
    time.getSeconds() +
    ":" +
    time.getMilliseconds();
  return `${cDate()}.${cTime()}`;
};

export const header = (execTime, config, log, server, liteMode) => {
  var port = server.address().port;
  log("FragnetOS", liteMode ? "LITE" : "CLIENT", "Edition", 21);
  log("Created by Fronrich Puno 2021");
  log(`                                                                                                
        ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\`                                         
        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@L                                         
        @QQQQQQQ@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@q/~7:rl,}ol)iii7z}L         \\\\\\\\/////)\\   
        QQQQQQQ@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@$ui{F/OB\\         ,ao     :W.         ,!  
        WWWWWQQQQQQQQQQQ@QQQQQQQQQQQQ@QQQQQQQQQQQQQQQQQQar}!z@x             '#'   Q\`              
        ppbQQBQQBQBQQBQQQQBQQBQBQQBQQQQBQQBQBQQBQQQQBQQBq?zs4C               \`@   7k              
        4bBO#NOBD8#K#WHBONNOBD8#K#WHBbNNOBD8#K#WHBO#NOBDo7' @                 p!   ,s)LL\\!.       
      !u##############################################%y:   @                 O!        \`:?\\/iz,  
    !wNNQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQBX7),   sF               \`@                {k 
  :vjjjyDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD6s?***,    wx             ,Q'                 @ 
.!^;;;;;{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{l>!!!!!!.     ^X/         ,ae\`   \`j?           zy 
\`\`\`\`\`\`\`\`\`::::::::::::::::::::::::::::::::::::::::,,,,,,,,\`       "}s7)ii)7z\\        ,i\\||????|\\),  
        ................................................\`
  `);

  log();
  log("Fragnet Kernel running on port", port);
  const guiLocation = `http://127.0.0.1:${port}`;
  !liteMode && log(`GUI running on ${guiLocation}`);
  // !liteMode && opn(guiLocation);
  log("Current Time", execTime);
  log("config:", config);
  log();
  log("VM LOAD");
  log("------------------");
  log();
};
// what to do when you add a file
export const onAddServer = (
  path,
  threads,
  execTime,
  loadingBar,
  queueDir,
  liteMode,
  threadCount
) => {
  // add load
  loadingBar.increment(1);

  // log file
  const logEntry = `${path} | ${currentDateTime()}`;
  exec(`echo "${logEntry}" >> ${queueDir}.session-${execTime}.log`);
  const genID = () => {
    const id =
      "0x" + parseInt(Math.random() * (1 << 30).toString(10)).toString(16);
    if (threads.includes(id)) {
      id = genID();
    }
    return id;
  };
  const id = genID();
  threads.push(id);

  // Create a thread using exec from child process
  // log(`Processing File on thread ${id}`);
  createThread(`node thread.js "${id}" "${path}"`, (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    loadingBar.increment(-1);
  });

  // delete from thread list
  for (var i = 0; i < threads.length; i++) {
    if (threads[i] === id) {
      threads.splice(i--, 1);
    }
  }
};

export const onAddContainer = (path, runningThreads, req, res) => {
  runningThreads += 1;
  res.json({ runningThreads: runningThreads });
  return runningThreads;
};
