"use strict";

import {
  chaChaDecrypt,
  chaChaDecryptJimp,
  chaChaDelete,
  chaChaEncrypt,
  drawBuffer,
} from "./utils/cryptoUtils.js";

const keypress = async () => {
  process.stdin.setRawMode(true);
  return new Promise((resolve) =>
    process.stdin.once("data", () => {
      process.stdin.setRawMode(false);
      resolve();
    })
  );
};

(async () => {
  const { key, nonce, ciphertext } = chaChaDelete("hw.txt", 256, 64, "hw.frag");

  await keypress();

  drawBuffer(key, "key.png");
  await keypress();
  drawBuffer(nonce, "nonce.png");
  await keypress();

  await chaChaDecryptJimp("key.png", "nonce.png", "hw.frag", "hw.txt");
})().then(process.exit);
