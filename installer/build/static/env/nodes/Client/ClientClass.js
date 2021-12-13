import GenericNode from "../Generic/GenericNodeClass.js";
const Client = class extends GenericNode {
  constructor(
    nodeType,
    address,
    creationDate,
    maxTransactions,
    virtualThreadID,
    filePath,
    schemaDir
  ) {
    super(
      nodeType,
      address,
      creationDate,
      maxTransactions,
      virtualThreadID,
      filePath,
      schemaDir
    );
  }

  processData = () => {
    // console.log(this.data);
    // decide what to do based on file type
    // if file, encrypt and
  };
};

export default Client;
