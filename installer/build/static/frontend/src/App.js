import "./App.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import deepcopy from "deepcopy";

import Home from "./routes/Home";
import Info from "./routes/Info";

import Taskbar from "./components/Taskbar";
import { Layer } from "./routes/Layout";
import { ReactComponent as Logo } from "./media/logo.svg";
import Appshortcut from "./components/AppShortcut";
import KernelContextAPI from "./apis/KernelContextAPI";

import WM from "./components/WM";

const Desktop = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const WinCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: ${({ openWindows }) => 100 / openWindows.length}%;
`;

const useForceUpdate = () => {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
};

const App = () => {
  const [currWindows, setCurrWindows] = useState([]);
  const forceUpdate = useForceUpdate();

  const openWindow = (windowName) => {
    if (currWindows.includes(windowName)) return;
    else {
      const list = currWindows;
      list.push(windowName);
      setCurrWindows(list);
      forceUpdate();
    }
  };

  const closeWindow = (windowName) => {
    if (!currWindows.includes(windowName)) return;
    else {
      const list = [];
      currWindows.map((win) => win !== windowName && list.push(win));
      setCurrWindows(list);
      forceUpdate();
    }
  };

  // A window Manager component
  const List = ({ currWindows }) => {
    return currWindows.map((win) => (
      <WinCont openWindows={currWindows} key={win}>
        {winMap[win]}
      </WinCont>
    ));
  };

  const winMap = {
    terminal: <Home onClose={() => closeWindow("terminal")} />,
    info: <Info onClose={() => closeWindow("info")} />,
  };

  return (
    <KernelContextAPI>
      <Layer>
        <Logo />
      </Layer>
      <WM />
    </KernelContextAPI>
  );
};

export default App;
