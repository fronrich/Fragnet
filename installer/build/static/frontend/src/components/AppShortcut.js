import React from "react";
import * as AppIcon from "react-icons/bs";
import styled from "styled-components";
import Interactable from "../primitives/Interactable";

const IconWrapper = styled(Interactable)`
  font-size: 1rem;
  line-height: 0;
  width: 16px;
  height: 16px;
  overflow: hidden;
  padding: 0;
  margin: 0;
  cursor: pointer;
  svg {
    padding: 0;
    margin: 0;
  }
  a {
    padding: 0;
    margin: 0;
  }
`;

const Appshortcut = ({ appName, iconName, onClick }) => {
  const Icon = AppIcon[iconName];
  return (
    <IconWrapper onClick={onClick}>
      <Icon />
    </IconWrapper>
  );
};

export default Appshortcut;
