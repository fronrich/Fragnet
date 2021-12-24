export const ioAPI = (io) => {
  let clientCount = 0;
  io.on("connection", (socket) => {
    clientCount += 1;
    socket.emit("user-count", clientCount);
    liteMode && clients.increment(1);
    // SOCKET COMMANDS
    // this is here for debugging purposes
    socket.on("debug", () => {
      socket.emit("debug-log", { status: "running in background" });

      createThread(`node debug.mjs "${queueDir}"`, (error, stdout, stderr) => {
        if (error) throw error;
        stdout && socket.emit("debugS-log", { status: "complete" });
      });
    });

    socket.on("request-config", () => {
      socket.emit("return-config", config);
    });

    socket.on("shell", (data) => {
      // run shell command and return the result
      createThread(data, (error, stdout, stderr) => {
        if (error) socket.emit('return-shell', {res: 'invalid shell command'});
        stdout && socket.emit('return-shell', {res: stdout});
      })
    })

    socket.on("upload-file", (data) => {
      // upload file to the queue
      const {file, enc} = data
      if (enc) {
        // encrypt true, encrypt in place before moving file over
        // uses chacha20 algorithm
      }
    })

    socket.on("disconnect", () => {
      clientCount -= 1;
      socket.emit("user-count", clientCount);
      liteMode && clients.increment(-1);
    });
  });
}