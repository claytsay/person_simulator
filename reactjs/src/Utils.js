import forge from 'node-forge';

const algorithm = "AES-CBC";

// = = = = = = = = = = = = =
// Utility Functions
// = = = = = = = = = = = = =

/**
 * A function to encrypt outgoing data
 *
 * Specifically adapted to encrypting a very specific data type as an object.
 * The object input should have properties "name" and "text", both in the form
 * of regular strings. The return value will have encrypted name and text as
 * well as an additional property "encryption" object that has properties
 * regarding what type of encryption and IV were used.
 *
 * If it encounters an error in encryption, returns a skeleton object and logs
 * the error.
 *
 * TODO: Make this function more generalizable.
 *
 * @param {object} data The data to be encrypted.
 * @param {string} key The encryption key as a hexadecimal string.
 * @returns {{name: string, text: string, encryption: object}} The encrypted
 * data object.
 */
export function encryptUtf8(data, key) {
  try {
    let keyBytes = forge.util.hexToBytes(key);
    let iv = forge.random.getBytesSync(32);
    let cipher = forge.cipher.createCipher(algorithm, keyBytes);
    let cipherUtf8 = (plaintext) => {
      cipher.start({iv: iv});
      cipher.update(forge.util.createBuffer(forge.util.encodeUtf8(plaintext)));
      cipher.finish();
      return cipher.output.getBytes();
    };
    return {
      name: cipherUtf8(data.name),
      text: cipherUtf8(data.text),
      encryption: {
        algorithm: algorithm,
        iv: iv
      }
    };
  }
  catch (e) {
    console.error("encryptUtf8: Error in encrypting outgoing message.");
    return {
      name: "",
      text: "",
      encryption: {
        algorithm: "",
        iv: ""
      }
    };
  }
}

/**
 * A function to decrypt incoming data.
 *
 * Very specifically adapted for decrypting incoming data. Takes in an object
 * with properties "name" and "response".
 *
 * If it encounters an error in encryption, returns a skeleton object and logs
 * the error.
 *
 * TODO: Make this function more generalizable.
 *
 * @param {object} data The data object to be decrypted
 * @param {string} key The decryption key as a hexadecimal string.
 * @param {string} iv The IV used in encryption as a byte string.
 * @returns {{name: string, type: string, content: object}} The encrypted
 * data object.
 */
export function decryptUtf8(data, key, iv) {
  try {
    let keyBytes = forge.util.hexToBytes(key);
    let decipher = forge.cipher.createDecipher(algorithm, keyBytes);
    let decipherUtf8 = (ciphertext) => {
      decipher.start({iv: iv});
      decipher.update(forge.util.createBuffer(ciphertext));
      decipher.finish();
      return forge.util.decodeUtf8(decipher.output.getBytes());
    };
    return {
      name: decipherUtf8(data.name),
      type: "server",
      content: data.response.map((x) => decipherUtf8(x, iv))
    };
  }
  catch (e) {
    console.log("decryptUtf8: Error in decrypting incoming message.");
    return {
      name: "",
      type: "server",
      content: []
    };
  }

}


/**
 * Makes an HTTP request.
 * 
 * Makes an asynchronous HTTP request, executing the callback
 * function when finished.
 * 
 * @param {string} url The URL to send the request to.
 * @param {string} method The request method (e.g. "GET").
 * @param {object} data The data to be sent along with the request.
 * @param {function} callback The function to be executed when the
 *  request is finished. Gets called with the response text as the
 *  sole argument.
 */
export function makeRequest(url, method, data, callback) {
  let http = new XMLHttpRequest();
  http.onload = () => {
    callback(http.responseText)
  };
  http.open(method, url);
  http.send(JSON.stringify(data));
}

// TODO: Is this correct convention?
export default makeRequest;
