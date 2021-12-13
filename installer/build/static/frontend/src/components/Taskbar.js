import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  background: rgb(0,255,162);
  background: linear-gradient(0deg, rgba(0,255,162,1) 0%, rgba(0,154,98,0) 100%);
  );
`;

const Taskbar = ({ children }) => {
  return <Bar>{children}</Bar>;
};

export default Taskbar;
