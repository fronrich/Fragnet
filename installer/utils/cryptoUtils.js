import * as chacha20 from "chacha20";
import { exec } from "child_process";
import { readFile, writeFile } from "../apis/dataAPIs.js";
import * as fs from "fs";
import { randomBytes } from "crypto";
import Jimp from "jimp";

// var plaintext = "testing";
// // pass in buffers, returns a buffer
// var ciphertext = chacha20.encrypt(key, nonce, Buffer.from(plaintext));
// console.log(ciphertext.toString("hex")); // prints "02dd93d9c99f5a"
// console.log(chacha20.decrypt(key, nonce, ciphertext).toString()); // prints "testing"

const STD_ENCODING = "binary";

export const corruptFile = (path, iterations = 5) => {
  // corrupt file
  for (let i = 0; i < iterations; i++) {
    let bs = "";

    // limit corruption scope in terms of disk space
    const limit = Math.random() * 100;
    for (let j = 0; j < limit; j++) {
      bs += (Math.random() * 1000000).toString(2);
    }
    bs = bs.replace(".", "1");
    const bin = Buffer.from(bs).toString("binary");
    exec(`echo "${bin}" > ${path}`);
  }
};

// corrupt a file 'iterations' times to make it unrecoverable, then delete the file
export const permaDelete = (path, iterations = 5) => {
  corruptFile(path, iterations);

  // delete file
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

const fillBuffer = (size) => {
  // Calling randomBytes method with callback
  const buffer = randomBytes(size);
  return buffer;
};

export const chaChaEncrypt = (
  path,
  keyBytes = 256,
  nonceBytes = 16,
  newPath = path
) => {
  // pass in buffers, returns a buffer
  const key = fillBuffer(keyBytes);
  const nonce = fillBuffer(nonceBytes);
  const ciphertext = chacha20.encrypt(
    key,
    nonce,
    Buffer.from(readFile(path), "utf8")
  );

  // send keys and nonce to the local keys folder
  // send nonce to the local keys folder
  // TODO: create art format for ciphertext
  return {
    key: key,
    nonce: nonce,
    ciphertext: ciphertext,
  };
};
// use chacha20 algorithm to encrypt a file then destroys it permanently
// return an object with the cypertext, ket, and nonce
export const chaChaDelete = (
  path,
  keyBytes = 256,
  nonceBytes = 16,
  newPath = path
) => {
  const chaChaObj = chaChaEncrypt(path, keyBytes, nonceBytes);

  // permadelete the old file to remove any trace of it
  permaDelete(path, 100);

  // if newPath is defined save the encrypted file under a new random name
  if (path !== newPath) {
    writeFile(newPath, chaChaObj.ciphertext.toString(STD_ENCODING));
  }
  // write ciphertext to the file

  return chaChaObj;
};

// decrypt ciphertext
export const chaChaDecrypt = (key, nonce, cipher) => {
  return chacha20.decrypt(key, nonce, cipher).toString();
};

export const chaChaDecryptJimp = async (keyImg, nonceImg, path, newPath) => {
  const ciphertext = Buffer.from(readFile(path), STD_ENCODING);
  await Jimp.read(keyImg, async (err, image) => {
    if (err) throw err;
    const keyBuf = image.bitmap.data;
    await Jimp.read(nonceImg, (err, image) => {
      if (err) throw err;
      const nonceBuf = image.bitmap.data;
      writeFile(newPath, chaChaDecrypt(keyBuf, nonceBuf, ciphertext));
      permaDelete(path);
    });
  });
};

// draws a png of buffer
// buffer must be multiple of 4
export const drawBuffer = (key, path) => {
  const length = key.length;
  const hexMap = [];

  let byteIter = 0;
  let hexIter = 0;
  const hexLim = 4;
  const dimLim = Number(Math.sqrt(length / hexLim));

  // sort hex into hexcolors
  for (let x of key.values()) {
    let byte = x.toString(16);
    byte = byte.length !== 1 ? byte : "0" + byte;
    switch (byteIter) {
      case hexLim:
        hexIter++;
        byteIter = 0;
      case 0:
        hexMap[hexIter] = "0x";
    }
    // append hexmap
    hexMap[hexIter] += byte;
    byteIter++;
  }

  // sort hexcolors into sqrt(length) X sqrt(length) grid
  const img = [];
  hexIter = 0;
  for (let row = 0; row < dimLim; row++) {
    img[row] = [];
    for (let col = 0; col < dimLim; col++) {
      img[row][col] = parseInt(Number(hexMap[hexIter]), 10);
      hexIter++;
    }
  }

  const image = new Jimp(dimLim, dimLim, (err, image) => {
    if (err) throw err;

    img.map((row, y) => {
      row.map((color, x) => {
        image.setPixelColor(color, x, y);
      });
    });

    image.write(path, (err) => {
      if (err) throw err;
    });
  });
};
