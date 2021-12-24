import React from "react";
import styled from "styled-components";
import Interactable from "../primitives/Interactable";
import { Link } from "react-router-dom";
import { Layer } from "./Layout";

const openFullscreen = (e) => {
  e = e.target;
  if (e.requestFullscreen) {
    e.requestFullscreen();
  } else if (e.webkitRequestFullscreen) {
    /* Safari */
    e.webkitRequestFullscreen();
  } else if (e.msRequestFullscreen) {
    /* IE11 */
    e.msRequestFullscreen();
  }
};

const LoginButton = styled(Interactable)`
  color: #fff;
  text-decoration: none;
  padding: 20px;
  font-size: 2rem;
  background-color: #040a1a;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Login = () => {
  return (
    <Layer>
      <Link
        to="/home"
        onClick={(e) => {
          console.log(e);
          openFullscreen(e);
        }}
      >
        <LoginButton>
          <h1>Login</h1>
        </LoginButton>
      </Link>
    </Layer>
  );
};

export default Login;
