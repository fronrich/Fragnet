import { Validator } from "jsonschema";
import * as fs from "fs";
import deepcopy from "deepcopy";

// validate data against a schema. If data is invalid, throw an error
// supports multi-level schema with addition of subschemas
export const validateSchema = (data, schema, subschemas = []) => {
  const v = new Validator();

  // add any subschemas if any
  if (subschemas.length !== 0)
    subschemas.map((subschema) => v.addSchema(subschema, subschema["id"]));

  // return whether or not the schemas match
  return v.validate(data, schema).errors.length === 0;
};

// read a file and save as bitstream
export const readFile = (dir) => {
  return fs.readFileSync(dir, "utf8");
};

// import a json since modules are not supported in node
export const importJSON = (dir) => {
  let data = "";
  try {
    data = readFile(dir);
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`);
  }
  try {
    return JSON.parse(data);
  } catch (err) {}
  return null;
};

// import a schema, converts it from json-schema format to npm package jsonschema
export const importSchema = (dir) => {
  const rawSchema = deepcopy(importJSON(dir));

  // validate schema layout
  const STANDARD_SCHEMA = "http://json-schema.org/draft-04/schema#";
  if (rawSchema["$schema"] !== STANDARD_SCHEMA) throw new Error();

  rawSchema["id"] = rawSchema["$id"];
  const processedSchema = deepcopy(rawSchema);
  return processedSchema;
};
