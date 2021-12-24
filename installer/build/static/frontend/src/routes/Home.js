import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Window from "../components/Window";
import { socket } from "../apis/KernelContextAPI";

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Ubuntu Mono", monospace;
  font-size: 1rem;
`;

const StyledInput = styled.input`
  background: none;
  outline: none;
  color: inherit;
  border: none;
  font-size: 1rem;
  font-family: "Ubuntu Mono", monospace;
  width: 75%;
`;

const Row = styled.div`
  display: block;
  width: 100%;
  & span {
    overflow-wrap: break-word;
  }
  margin-bottom: 1rem;
`;

// home is a terminal used to run shell commands via express
const Home = ({ onClose, ram, writeRam }) => {
  const [cache, setCache] = useState(ram.terminal || []);
  const KeyPressElement = () => {
    const [value, setValue] = useState("");

    const updateRes = () => {
      const addEntry = (data) => {
        data = JSON.stringify(data);
        setCache([
          ...cache,
          <Row key={cache.length + 1 + "_res"}>
            <span>{data}</span>
          </Row>,
        ]);
      };
      socket.on("return-config", (data) => {
        addEntry(data);
      });
      socket.on("debug-log", (data) => {
        addEntry(data);
      });
      socket.on("return-shell", (data) => {
        addEntry(data);
      });
    };
    useEffect(() => {
      const cmdRet = setInterval(updateRes(), 100);
      return () => {
        clearInterval(cmdRet);
        socket.off();
      };
    });
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        // save request
        setCache([
          ...cache,
          <Row key={cache.length + "_req"}>
            <span>client:~$&nbsp;</span>
            <span>{value}</span>
          </Row>,
        ]);
        const args = value.split(" ");
        const cmd = args[0];
        const shellCmd = args[1] || "";
        // take care of clear
        cmd === "clear" && setCache([]);

        writeRam("terminal", cache);

        // send request
        // talk to server to access shell
        socket.emit(cmd, shellCmd);

        // receive request
        updateRes();
      }
    };
    return (
      <Row>
        <span>client:~$&nbsp;</span>
        <StyledInput
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e)}
          autoFocus
        />
      </Row>
    );
  };
  // color="#51ff9a"
  // color="#ffa2f3"

  return (
    <Window color="#5c6caf" windowName="Terminal" onClose={onClose}>
      <Contents>
        {cache}
        <KeyPressElement />
      </Contents>
    </Window>
  );
};

export default Home;
