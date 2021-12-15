import React from "react";
import styled from "styled-components";
import Interactable from "../primitives/Interactable";
import Clock from "./Clock";

const AppTray = styled.div`
  display: flex;
`;

// const color = '#0e0e14';
const color = "#fff";
const Bar = styled(Interactable)`
  color: ${color};
  font-family: 'Comfortaa', cursive;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
  background-color: #1d2238;
  /* background-image: linear-gradient(0deg, #0000002b 0%, #6b6b6b14 100%);
  background-blend-mode: soft-light; */

  box-shadow: 0 2px 2px 2px #141414;
  overflow: hidden;

  & svg {
    fill: ${color};
    stroke: ${color};

  }

  & div {
    margin: 10px;
  }
  }
`;

const Taskbar = ({ children }) => {
  return (
    <Bar>
      <AppTray>{children}</AppTray>
      <Clock />
    </Bar>
  );
};

export default Taskbar;
