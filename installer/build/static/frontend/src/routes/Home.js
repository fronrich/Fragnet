import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PageLayout } from "./Layout";
import Window from "../components/Window";
import { socket, reqRetPairs } from "../apis/KernelContextAPI";

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
const Home = () => {
  const [cache, setCache] = useState([]);
  const KeyPressElement = () => {
    const [value, setValue] = useState("");
    const [res, setRes] = useState("");
    useEffect(() => {
      socket.on("return-config", (data) => {
        console.log(data);
        setRes(JSON.stringify(data), null, "\t");
      });
      socket.on("debug-log", (data) => {
        console.log(data);
        setRes(JSON.stringify(data), null, "\t");
      });

      return () => {
        socket.off();
      };
    });
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        setCache([
          ...cache,
          <Row key={cache.length}>
            <span>client:~$&nbsp;</span>
            <span>{value}</span>
          </Row>,
          <Row key={cache.length + 1}>
            <span>{res}</span>
          </Row>,
        ]);
        socket.emit(value, () => {});
        // talk to server to access shell
      } else {
        setValue(value + e.key);
      }
    };
    return (
      <Row>
        <span>client:~$&nbsp;</span>
        <StyledInput type="text" onKeyPress={(e) => handleKeyPress(e)} />
      </Row>
    );
  };
  // color="#51ff9a"
  // color="#ffa2f3"
  return (
    <Window color="#51ff9a" windowName="Terminal">
      <Contents>
        {cache}
        <KeyPressElement />
      </Contents>
    </Window>
  );
};

export default Home;
