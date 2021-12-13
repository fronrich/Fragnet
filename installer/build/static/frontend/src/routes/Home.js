import React, { useState } from "react";
import styled from "styled-components";
import { PageLayout } from "./Layout";
import Window from "../components/Window";

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  font-family: "Ubuntu Mono", monospace;
`;

const StyledInput = styled.input`
  background: none;
  outline: none;
  color: inherit;
  border: none;
  width: auto;
  font-size: 1.5rem;
  font-family: "Ubuntu Mono", monospace;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

// home is a terminal used to run shell commands via express
const Home = () => {
  const [cache, setCache] = useState([]);
  const KeyPressElement = () => {
    const [value, setValue] = useState("");
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        // talk to server to access shell
        console.log(cache);
        setCache([
          ...cache,
          <Row>
            <span>{"cmd >> "}</span>
            <span>{value}</span>
          </Row>,
        ]);
      } else {
        setValue(value + e.key);
      }
    };
    return (
      <Row>
        <span>{"cmd >> "}</span>
        <StyledInput type="text" onKeyPress={(e) => handleKeyPress(e)} />
      </Row>
    );
  };
  // color="#51ff9a"
  return (
    <Window color="#ffa2f3" windowName="Terminal">
      <Contents>
        {cache}
        <KeyPressElement />
      </Contents>
    </Window>
  );
};

export default Home;
