import React, { useState } from "react";
import styled from "styled-components";
import { Home, Info } from "../routes";
import Taskbar from "./Taskbar";
import { Layer } from "../routes/Layout";
import Appshortcut from "./AppShortcut";

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

const WM = () => {
  // forceUpdate
  const useForceUpdate = () => {
    const [value, setValue] = useState(0); // integer state
    return () => setValue((value) => value + 1); // update the state to force render
  };
  const [currWindows, setCurrWindows] = useState([]);
  const forceUpdate = useForceUpdate();

  // preserve program states
  const [ram, setRam] = useState({});

  const writeRam = (programName, data) => {
    const temp = ram;
    // attempt to update program if open
    temp[programName] = data;
    return setRam(temp);
  };

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
    const winMap = {
      terminal: (
        <Home
          ram={ram}
          writeRam={writeRam}
          onClose={() => closeWindow("terminal")}
        />
      ),
      info: (
        <Info
          ram={ram}
          writeRam={writeRam}
          onClose={() => closeWindow("info")}
        />
      ),
    };

    return currWindows.map((win) => (
      <WinCont openWindows={currWindows} key={win}>
        {winMap[win]}
      </WinCont>
    ));
  };

  const WMDesktop = () => (
    <Desktop>
      <List currWindows={currWindows} />
    </Desktop>
  );

  const WMTaskbar = () => (
    <Taskbar>
      <Appshortcut
        appName="terminal"
        iconName={"BsTerminalFill"}
        onClick={() => openWindow("terminal")}
      />
      <Appshortcut
        appName="clikmands"
        iconName={"BsGrid3X2GapFill"}
        onClick={() => openWindow("clikmands")}
      />
      <Appshortcut
        appName="info"
        iconName={"BsInfoSquareFill"}
        onClick={() => openWindow("info")}
      />
    </Taskbar>
  );

  return (
    <Layer justify="flex-start">
      <WMTaskbar />
      <WMDesktop />
    </Layer>
  );
};

export default WM;
