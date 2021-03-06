const fs = require('fs');
const forge = require('node-forge');
const logger = require('./logger.js');

// = = = = = = = = = = = = =
// Constants & Data Loading
// = = = = = = = = = = = = =

// Cryptographic constants
const generate = require("./generate.js");
generate.genAesKey(32);
/**
 * What algorithm to use in the cryptography.
 * @type {string}
 */
const algorithm = 'AES-CBC';
/**
 * The length of the IV used in cryptography, in number of bytes.
 * @type {number}
 */
const ivByteLength = 32;
const key = forge.util.hexToBytes(
  fs.readFileSync(__dirname + "/keys/AES-key.txt", "utf8")
);
const cipher = forge.cipher.createCipher(algorithm, key);
const decipher = forge.cipher.createDecipher(algorithm, key);

// Other constants
/**
 * The URL from which to allow access (i.e. from Allow-Access-Control-Origin).
 * @type {string}
 */
const urlAcao = "http://ct3m.asuscomm.com/person_simulator";


// = = = = = = = = = = = = =
// Request-Handling Functions
// = = = = = = = = = = = = =

/**
 * Handles a GET request to the server.
 *
 * @param {IncomingMessage} request The incoming HTTP request. Is
 *  not used at all in the function.
 * @param {ServerResponse} response The outgoing HTTP response.
 */
function handleGetRequest(request, response) {
  console.log("= = = GET = = =");
  logger.logToRequest("GET", "start");

  response.writeHead(200, {
    "Access-Control-Allow-Origin": urlAcao,
    "Content-Type": "application/json"
  });

  getNames((result) => {
    response.end(result);
    logger.logToRequest("GET", "end");
  });
}

/**
 * Handles a POST request to the server.
 *
 * Is actually a pure function. Doesn't really "post" anything: It's
 * more of a GET request with certain parameters.
 *
 * @param {IncomingMessage} request The incoming HTTP request.
 * @param {ServerResponse} response The outgoing HTTP response.
 */
function handlePostRequest(request, response) {
  console.log("= = = POST = = =");
  logger.logToRequest("POST", "start");

  let body = [];
  request.on('error', (err) => {
    console.error(err);

  }).on('data', (chunk) => {
    body.push(chunk);

  }).on('end', () => {
    response.writeHead(200, {
      "Access-Control-Allow-Origin": urlAcao,
      "Content-Type": "application/json"
    });

    // Get and decrypt the data
    body = JSON.parse(Buffer.concat(body).toString());
    let iv = body.encryption.iv;
    let data = {
      name: decipherUtf8(body.name, iv),
      context: decipherUtf8(body.text, iv)
    };
    logger.logToChat("User", data.context);

    // Utilise the client-sent data
    getText(data, (result) => {
      let resultJson = JSON.parse(result);
      resultJson.response.forEach((text) => {
        logger.logToChat(resultJson.name, text);
      });

      // Encrypt the result
      let iv = forge.random.getBytesSync(ivByteLength);
      let resultEncrypt = {
        name: cipherUtf8(resultJson.name, iv),
        response: resultJson.response.map((x) => cipherUtf8(x, iv)),
        encryption: {
          algorithm: algorithm,
          iv: iv,
          ivByteLength: ivByteLength
        }
      };

      // Send it back to the client
      response.end(JSON.stringify(resultEncrypt));
      logger.logToRequest("POST", "end");
    });
  });
}


// = = = = = = = = = = = = =
// Miscellaneous Utility Functions
// = = = = = = = = = = = = =

/**
 * Encrypts a line of text.
 *
 * If encryption fails for whatever reason, returns an empty string
 * and logs an error.
 *
 * @param {string} plaintext What is to be encrypted, coded in UTF-8.
 * @param {string} iv The IV to be used in encryption, as a binary string.
 * @returns {string} Binary string representing the encrypted text.
 */
function cipherUtf8(plaintext, iv) {
  try {
    cipher.start({iv: iv});
    cipher.update(forge.util.createBuffer(forge.util.encodeUtf8(plaintext)));
    cipher.finish();
    return cipher.output.getBytes();
  }
  catch (e) {
    logger.logToError(e);
    return "";
  }

}

/**
 * Decrypts a line of text.
 *
 * If decryption fails for whatever reason, returns an empty string
 * and logs an error.
 *
 * @param {string} ciphertext What is to be decrypted, as a binary string.
 * @param {string} iv The IV to be used in decryption, as a binary string.
 * @returns {string} UTF-8 string representing the decrypted text.
 */
function decipherUtf8(ciphertext, iv) {
  try {
    decipher.start({iv: iv});
    decipher.update(forge.util.createBuffer(ciphertext));
    decipher.finish();
    return forge.util.decodeUtf8(decipher.output.getBytes());
  }
  catch (e) {
    logger.logToError(e);
    return "";
  }

}


/**
 * Takes in data and returns the result from the Python backend.
 *
 * Executes "conversation.py" with certain arguments and executes a
 * callback function once completed.
 *
 * @param {string} command The command line arguments to apply.
 * @param {string} data The data to be piped in via stdin.
 * @param {function} callback The callback function to be executed
 *  upon completion. Should take one string argument representing the
 *  data returned by the Python computation.
 */
function pythonProcess(command, data, callback) {
  console.log("= = = CHILD PROCESS = = =");
  let {spawn} = require("child_process");
  // TODO: Change between "python" and "python3" as necessary
  let process = spawn("python3", ["../python/conversation.py", command]);
  let dataString = "";

  process.stdout.on('data', (data) => {
    dataString += data.toString();
  });
  process.stdout.on('end', () => {
    // console.log("= = = CHILD PROCESS = = =");
    return callback(dataString);
  });

  process.stderr.on('data', (data) => {
    logger.logToError(data);
  });

  process.stdin.write(JSON.stringify(data));
  process.stdin.end();
}

/**
 * Used to ask for all the names in all the available data.
 *
 * Utilises the pythonProcess function. See that function for more
 * details.
 *
 * @param {function} callback The function to be executed at conclusion.
 */
function getNames(callback) {
  return pythonProcess("names", "", callback);
}

/**
 * Used to ask for phrases given a name and context.
 *
 * Utilises the pythonProcess function. See that function for more
 * details.
 *
 * @param {object} data The data to be sent to the Python backend.
 * @param {function} callback The function to be executed at conclusion.
 */
function getText(data, callback) {
  return pythonProcess("phrase", data, callback);
}



module.exports = {
  handleGetRequest: handleGetRequest,
  handlePostRequest: handlePostRequest
};
