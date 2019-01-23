const fs = require('fs');
const forge = require('node-forge');

/**
 * Generates an AES key.
 *
 * Generates the key synchronously and writes it to a file as a hexadecimal
 * value. Writes to "/keys/AES-key.txt".
 *
 * @param {int} bytes The length/size of the key.
 */
function genAesKey(bytes=32) {
  let key = forge.random.getBytesSync(bytes);
  fs.writeFileSync(
    __dirname + "/keys/AES-key.txt",
    forge.util.bytesToHex(key)
  );
  console.log(`Generated ${bytes}-byte AES key.`);
}

genAesKey(32);

module.exports = {
  genAesKey: genAesKey
};
