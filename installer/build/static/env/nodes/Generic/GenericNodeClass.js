"use strict";
import {
  validateSchema,
  importSchema,
  importJSON,
  readFile as rf,
} from "../../../../../apis/dataAPIs.js";

/**
 * A generic node class instance is created
 * whenever a node needs to perform a function.
 * While the physical node may always be running an
 * express.js app, in order to be energy and
 * computationally efficent, the class is lazy loaded
 * (baiscally like manually opening up a computer program)
 * and then deleted once the operation is done.
 *
 * This design also means that classes can be run in parallel,
 * making each node capable of running multiple virtual nodes (thread)
 * and performing several transactions at once
 *
 * @param {*} nodeType
 * @param {*} address
 * @param {*} creationDate
 * @param {*} maxTransactions
 */
const GenericNode = class {
  // establish props
  constructor(
    nodeType,
    address,
    creationDate,
    maxTransactions,
    virtualThreadID,
    filePath,
    schemaDir
  ) {
    // schemas
    const schemaDirs = {
      wrappedBitstream: `${schemaDir}wrappedBitstream.schema.json`,
      wrappedBitstreamOrderedSet: `${schemaDir}wrappedBitstreamOrderedSet.schema.json`,
    };
    const schemas = {
      wrappedBitstream: importSchema(schemaDirs.wrappedBitstream),
      wrappedBitstreamOrderedSet: importSchema(
        schemaDirs.wrappedBitstreamOrderedSet
      ),
    };
    /**
     * Read a file. isJSON changes the interpretation and return
     * @param {*} dir - path to file
     * @param {*} isJSON - if true, file is validated against
     * schemas and bitstream is extracted from json, else,
     * raw bitstream of the entire fileis returned
     */
    const readFile = (dir, isJSON) => {
      if (!isJSON) {
        return {
          primativeType: "File",
          subType: "File",
          bitstream: rf(dir),
        };
      } else {
        // read as JSON
        const pkg = importJSON(dir);

        if (pkg.primativeType === "Package") {
          const validators = {
            WrappedBitstream: (data) =>
              validateSchema(data, schemas.wrappedBitstream),
            WrappedBitstreamOrderedSet: (data) =>
              validateSchema(data, schemas.wrappedBitstreamOrderedSet, [
                schemas.EncryptedFragment,
              ]),
          };
          // validate file against schemas
          if (!validators[pkg.subType](data)) {
            throw new Error("invalid file. Node corrupt.");
          }
          return pkg;
        } else {
          // at this point it's most likley a non-architectural
          // json, so just read it as a file
          return {
            primativeType: "File",
            subType: "File",
            bitstream: rf(dir),
          };
        }
      }
    };

    this.data = readFile(filePath, filePath.includes(".json"));

    this.props = {
      nodeType,
      address,
      creationDate,
      maxTransactions,
      virtualThreadID,
    };
  }

  /**
   * Wrap data in container. this data will be sent out
   * @param {W} containerSchema - schema to validate against
   * @param {*} metadata
   * @param {*} contents - the inner contents
   * @param {*} contentsType - can either be bitstream or some data structure (struct)
   * @returns
   */
  containerizeData = (
    containerSchema,
    subschemas = [],
    metadata,
    contents,
    contentsType
  ) => {
    const payload = {
      ...metadata,
    };
    payload[contentsType] = contents;

    //make sure payload is valid
    if (!validateSchema(payload, containerSchema, subschemas))
      throw new Error();

    return payload;
  };

  // abstract function different for all node types
  // must return payload for vm to send
  processData = () => {};
};

export default GenericNode;
