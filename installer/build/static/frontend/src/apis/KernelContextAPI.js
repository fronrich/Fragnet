import React, { useState, useEffect } from "react";
import { RateLimit } from "async-sema";

// configure a limit of maximum 5 requests / second
const limit = RateLimit(0.25);

const Context = React.createContext();

const APILink = "http://localhost:8000";

const KernelContextAPI = ({ children }) => {
  // const [state, setState] = useState({ data: {}, isSynced: false });
  useEffect(() => {
    let state = { data: {}, isSynced: false };
    // resync state automatically every tick
    const tickSpeed = 5000;
    const reSync = () => {
      state = { data: state.data, isSynced: false };
    };
    // setInterval(reSync, tickSpeed);

    // sync state
    const syncState = async () => {
      await limit();
      await fetch(APILink)
        .catch((error) => {
          console.log("link to kernel lost");
          throw error;
        })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error();
          }
        })
        .then((data) => {
          console.log(data);
          setState({
            data: data,
            isSynced: true,
          });
        });
    };
    if (!state.isSynced) syncState();
  }, []);

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export default KernelContextAPI;
