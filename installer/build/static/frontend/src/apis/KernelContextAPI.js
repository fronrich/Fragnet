import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import cors from "cors";

const APILink = "http://localhost:8000";
const whitelist = ["http://localhost:3000", "http://localhost:8000"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

export const socket = socketIOClient(APILink, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "Access-Control-Allow-Origin",
  },
});

// use this function to send sockets and update the machine state
export const makeRequest = (eventName, event = () => {}) => {
  return socket.emit(eventName, event);
};

// use this function to receive data from socket
export const getReturn = (eventName, event = () => {}) => {
  socket.on(eventName, event);
};

export const reqRetPairs = {
  debug: "debug-log",
  "request-config": "return-config",
};

// getReturn("return-config", (data) => console.log(data))
const KernelContextAPI = ({ children }) => {
  // create context wrapper and set its endpoint to the socket
  const Context = React.createContext();
  const [endpoint, setEndpoint] = useState(APILink);
  const [testSocket, setTestSocket] = useState("hello");

  useEffect(() => {
    socket.on("test", (message) => console.log(message));
    makeRequest("request-config", () => {
      getReturn(reqRetPairs["request-config"], (data) =>
        console.log("Booting with config", data)
      );
    });

    // sync state
    // fetch(APILink)
    //   .catch((error) => {
    //     console.log("link to kernel lost");
    //     throw error;
    //   })
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     } else {
    //       throw new Error();
    //     }
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   });
  }, []);

  return <Context.Provider value={"hello"}>{children}</Context.Provider>;
};

export default KernelContextAPI;
