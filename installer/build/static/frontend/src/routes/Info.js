import React from "react";
import styled from "styled-components";
import Window from "../components/Window";
import { StateMachine } from "../apis/KernelContextAPI";
import { ReactComponent as Logo } from "../media/logo.svg";
import EthAdd from "../media/eth.png";

const Contents = styled.div`
  display: flex;
  flex-direction: row;
  font-family: "Ubuntu Mono", monospace;
  font-size: 0.75rem;
  & span,
  p {
    font-family: "Comfortaa", cursive;
  }
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-basis: 50%;
  height: 100%;
  margin: 20px;
`;

const LogoImg = styled(Logo)`
  width: 100px;
  height: auto;
`;

const Info = ({ onClose }) => {
  const state = React.useContext(StateMachine);
  const InfoList = () => {
    const keys = Object.keys(state);
    const list = keys.map((key) => {
      return (
        <code key={key}>
          {key}: {state[key]}
        </code>
      );
    });
    return <>{list}</>;
  };
  return (
    <Window color="#f8bfff" windowName="Info" onClose={onClose}>
      <Contents>
        <Side>
          <h1>
            <LogoImg />
            Fragnet OS
          </h1>
          <h2>Version 0.1.0</h2>
          <h3>Created by PiiNG</h3>
          <p>
            I created this project in 2021 as a decentralized alternative to
            modern cloud storage solutions. After several hacks, it has become
            obvious that the firewall appraoch to security isn't very effective.
            Instead, the security in this system relies on something entirely
            different. Instead of hiding files behind a firewall, they are
            encrypted, destroyed, and their byte data is scattered across the
            network. In order to access a file, it must be rebuit from fragments
            scattered throughout the network via a blueprint and key. The
            blueprint determines the shape of the peices to look for and how to
            put them back together, and the key, based of the WAMP encryption
            protocol I designed, acts as a 2FA which transforms the encrypted
            fragments into something readbale. The code is open-source and free
            to re-use and redistribute under other non-closed source projects.
            Please read the project's README files to learn more.
          </p>

          <span>Please consider donating! It helps pay my bills :)</span>
          <span>
            This Address takes ERC-20 Tokens (Ethereum, DAI, USDC, SHIB, etc...)
          </span>
          <img src={EthAdd} alt="eth add" />
        </Side>
        <Side>
          <h1>Live Stats</h1>
          <InfoList />
        </Side>
      </Contents>
    </Window>
  );
};

export default Info;
