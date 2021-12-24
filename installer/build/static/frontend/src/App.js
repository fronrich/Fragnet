import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./routes";
import { Layer } from "./routes/Layout";
import { ReactComponent as Logo } from "./media/logo.svg";
import KernelContextAPI from "./apis/KernelContextAPI";

import WM from "./components/WM";

const App = () => {
  return (
    <KernelContextAPI>
      <Layer>
        <Logo />
      </Layer>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Login />} />
          <Route path="home" element={<WM />} />
        </Routes>
      </BrowserRouter>
    </KernelContextAPI>
  );
};

export default App;
