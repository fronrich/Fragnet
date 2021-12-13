import styled from "styled-components";
import React from "react";
import Interactable from "../primitives/Interactable";

const windowPadding = 10;
const borderRad = 10;
const Border = styled(Interactable)`
  padding: ${windowPadding}px;
  border: 1px solid;
  border-color: ${({ color }) => color};
  border-radius: ${borderRad}px;
  width: calc(100% - ${windowPadding * 5}px);
  height: calc(100% - ${windowPadding * 5}px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Header = styled.div`
  background-color: ${({ color }) => color};
  color: #0e0e14;
  background-image: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-blend-mode: soft-light;
  border-radius: ${borderRad}px ${borderRad}px 0 0;
  width: 100%;
  height: ${windowPadding * 2}px;
  margin-bottom: ${windowPadding}px;
  & span {
    font-size: 1rem;
    font-family: "Ubuntu Mono", monospace;
    font-weight: 100;
    margin: ${windowPadding}px;
  }
`;

const Contents = styled.div`
  background: rgba(22, 19, 31, 0.9);
  border-radius: 0 0 ${borderRad}px ${borderRad}px;
  width: calc(100% - ${windowPadding * 4}px);
  height: calc(100% - ${windowPadding * 4}px);
  padding: ${windowPadding * 2}px;
`;

const Window = ({ children, color, windowName }) => {
  return (
    <Border color={color}>
      <Header color={color}>
        <span>{windowName}</span>
      </Header>
      <Contents>{children}</Contents>
    </Border>
  );
};

export default Window;
