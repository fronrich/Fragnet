import React from "react";
import styled from "styled-components";
import Interactable from "../primitives/Interactable";

const Bar = styled(Interactable)`
  color: #0e0e14;
  font-family: "Ubuntu Mono", monospace;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20px;
  background-color: rgb(0,255,162);
  background-image: linear-gradient(0deg, #000000 0%, rgba(255,255,255,0.25) 100%);
  background-blend-mode: soft-light;
  transition: 200ms;
  transition-delay: 500ms;
  transform: translateY(-75%);
  opacity: 0.1;

  & {
    transition: 200ms;
    transition-delay: 500ms;
    opacity: 0;
  }

  &:hover {
    transform: translateY(0);
    opacity: 1;
    & span{
    opacity: 1;
    }
  );
  }
`;

const Taskbar = ({ children }) => {
  return <Bar>{children}</Bar>;
};

export default Taskbar;
