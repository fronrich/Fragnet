import styled from "styled-components";
import React from "react";
import Interactable from "../primitives/Interactable";

const windowPadding = 15;
const borderRad = 5;
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
  background-color: ${({ color }) => `${color}aa`};
  /* background-image: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  background-blend-mode: soft-light; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: ${borderRad}px ${borderRad}px 0 0;
  /* border: 1px solid;
  border-color: ${({ color }) => color}; */
  width: 100%;
  height: ${windowPadding * 2}px;
  margin-bottom: ${windowPadding}px;
  font-family: "Comfortaa", cursive;
  & div {
    font-size: 1rem;
    margin: ${windowPadding}px;
  }
`;

const Contents = styled.div`
  background: ${({ contentsColor }) =>
    contentsColor || "rgba(22, 19, 31, 0.9)"};
  border-radius: 0 0 ${borderRad}px ${borderRad}px;
  /* border: 1px solid;
  border-color: ${({ color }) => color}; */
  width: calc(100% - ${windowPadding * 4}px);
  height: calc(100% - ${windowPadding * 4}px);
  padding: ${windowPadding * 2}px;
`;

const CloseButton = styled.div`
  pointer-events: all;
  cursor: pointer;
  background-color: red;
  width: 10px;
  height: 10px;
  border-radius: 10px;
`;

const Window = ({ children, color, windowName, contentsColor, onClose }) => {
  return (
    <Border color={color}>
      <Header color={color}>
        <CloseButton onClick={onClose} />
        <span>{windowName}</span>
      </Header>
      <Contents color={color} contentsColor={contentsColor}>
        {children}
      </Contents>
    </Border>
  );
};

export default Window;
