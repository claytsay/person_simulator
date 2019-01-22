const fs = require('fs');
const forge = require('node-forge');
const rsa = forge.pki.rsa;

/**
 * Generates two pairs of RSA keys.
 *
 * @param {int} bits The length of the key.
 * @returns {{publicKey2: *, publicKey1: *, privateKey1: *, privateKey2: *}}
 */
function genKeysToObj(bits) {
  let keypair1 = rsa.generateKeyPair({bits: bits});
  let keypair2 = rsa.generateKeyPair({bits: bits});
  return {
    publicKey1: keypair1.publicKey,
    privateKey1: keypair1.privateKey,
    publicKey2: keypair2.publicKey,
    privateKey2: keypair2.privateKey
  };
}

function genKeysToFile(bits) {
  let keys = genKeysToObj(bits);
  fs.writeFileSync(
    __dirname + "/keys/publicKey1.txt",
    forge.pki.publicKeyToPem(keys.publicKey1));
  fs.writeFileSync(
    __dirname + "/keys/privateKey1.txt",
    forge.pki.privateKeyToPem(keys.privateKey1));
  fs.writeFileSync(
    __dirname + "/keys/publicKey2.txt",
    forge.pki.publicKeyToPem(keys.publicKey2));
  fs.writeFileSync(
    __dirname + "/keys/privateKey2.txt",
    forge.pki.privateKeyToPem(keys.privateKey2));
}

genKeysToFile(256);

module.exports = {
  genKeysToObj: genKeysToObj,
  genKeysToFile: genKeysToFile
};
