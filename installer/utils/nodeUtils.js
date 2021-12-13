// Determine the type of node you want to dedicate this computer as
export const defineNode = (nodeType) => {
  const NODE_TYPE = [
    "CLIENT",
    "CRYPTOGRAPHER",
    "RECEPTIONIST",
    "DISTRIBUTOR",
    "WAREHOUSE",
  ];
  return NODE_TYPE[nodeType];
};

// immutable props used to identify the node on the network
const initProps = (nodeType, dnsAddress, creationDate) => {
  return {
    nodeType: nodeType,
    address: dnsAddress,
    creationDate: creationDate,
  };
};

// acts as a local state
// mutable properties
// states
// const initState = isSlashed;

// functions used to build nodes
// only populates the actual node directory
// parent directory (fragnet) is populated seperately
const buildClient = () => {};

const buildCryptographer = () => {};

const buildReceptionist = () => {};
