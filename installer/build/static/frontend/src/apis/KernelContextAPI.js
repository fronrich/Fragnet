import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const APILink = "http://localhost:8000";

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

// state machine context
export const StateMachine = React.createContext();

// getReturn("return-config", (data) => console.log(data))
const KernelContextAPI = ({ children }) => {
  // create context wrapper and set its endpoint to the socket
  const [state, setState] = useState({});
  const [users, setUsers] = useState(0);
  const [threads, setThreads] = useState(0);
  const [prevThreads, setPrevThreads] = useState(0);
  const [traffic, setTraffic] = useState("");
  const fetchMetrics = () => {
    socket.on("user-count", (data) => {
      setUsers(data);
    });
    socket.on("active-threads", (data) => {
      setThreads(data.activeThreads);
      setPrevThreads(data.activeThreads);
      setTraffic(data.threads);
    });
  };

  useEffect(() => {
    // compensate for concurrency issues
    const balanceThreads = () => {
      if (threads !== 0 && threads === prevThreads) {
        setThreads(0);
        setPrevThreads(0);
      }
    };
    const setStateToConfig = () => {
      socket.emit("request-config", () => {});
      socket.on("return-config", (data) => {
        setState(data);
      });
    };
    if (Object.keys(state).length === 0) {
      setStateToConfig();
    }
    const fetchInt = setInterval(fetchMetrics, 100);
    const balanceInt = setInterval(balanceThreads, 1000);
    return () => {
      clearInterval(balanceInt);
      clearInterval(fetchInt);
      socket.off();
    };
  }, [threads, prevThreads, state]);

  return Object.keys(state).length === 0 ? (
    <div>
      <span>booting kernel...</span>
    </div>
  ) : (
    <StateMachine.Provider
      value={{
        ...state,
        userCount: users,
        activeThreads: threads,
        transactionStream: traffic,
      }}
    >
      {children}
    </StateMachine.Provider>
  );
};

export default KernelContextAPI;
