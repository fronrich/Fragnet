import React from "react";
import * as AppIcon from "react-icons/fc";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Interactable from "../primitives/Interactable";

const IconWrapper = styled(Interactable)`
  font-size: 10rem;
  line-height: 0;
  width: fit-contents;
  height: min-contents;
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

const Appshortcut = ({ appName, iconName, link }) => {
  const Icon = AppIcon[iconName];
  return (
    <IconWrapper>
      <Link to={link}>
        <Icon />
      </Link>
    </IconWrapper>
  );
};

export default Appshortcut;
