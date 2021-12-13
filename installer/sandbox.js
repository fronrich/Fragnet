"use strict";

import { validateSchema, importSchema, importJSON } from "./apis/dataAPIs.js";

const data = [
  {
    nodeType: 0,
    ip: "108.162.221.168",
    fdcl: "fdcl://test/tesSASDt*jkads",
  },
];

const dnsSchema = importSchema("./build/oracle/dns/schemas/dns.schema.json");
const dnsMappingSchema = importSchema(
  "./build/oracle/dns/schemas/dnsMapping.schema.json"
);

const match = validateSchema(data, dnsSchema, [dnsMappingSchema]);
console.log(match);

importJSON("./dummy.data");
