import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Taskbar from "./components/Taskbar";
import { Layer } from "./routes/Layout";
import { ReactComponent as Logo } from "./media/logo.svg";
import React from "react";
import Appshortcut from "./components/AppShortcut";
import KernelContextAPI from "./apis/KernelContextAPI";
import Clock from "./components/Clock";

const App = () => {
  return (
    <KernelContextAPI>
      <Layer>
        <Logo />
      </Layer>
      <Layer>
        <BrowserRouter>
          <Layer justify="flex-start">
            <Taskbar>
              <Clock />
              {/* <Appshortcut
                appName="terminal"
                iconName={"FcSelfServiceKiosk"}
                link="/"
              /> */}
            </Taskbar>
          </Layer>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Layer>
    </KernelContextAPI>
  );
};

export default App;
