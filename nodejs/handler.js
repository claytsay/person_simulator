const fs = require('fs');
const forge = require('node-forge');
const publicKey =
  forge.pki.publicKeyFromPem(fs.readFileSync(
    __dirname + "/keys/publicKey1.txt", "utf8"));  // publicKey1
const privateKey =
  forge.pki.privateKeyFromPem(fs.readFileSync(
    __dirname + "/keys/privateKey2.txt", "utf8")); // privateKey2

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
  console.log("= = = GET: Start = = =");

  response.writeHead(200, {
    "Access-Control-Allow-Origin": "http://ct3m.asuscomm.com/person_simulator",
    "Content-Type": "application/json"
  });

  getNames((result) => {
    response.end(result);
    console.log("= = = GET: End = = =");
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
  console.log("= = = POST: Start = = =");

  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = JSON.parse(Buffer.concat(body).toString());
    response.writeHead(200, {
      "Access-Control-Allow-Origin": "http://ct3m.asuscomm.com/person_simulator",
      "Content-Type": "application/json"
    });

    let data = {
      name: forge.util.decodeUtf8(privateKey.decrypt(body.name)),
      context: forge.util.decodeUtf8(privateKey.decrypt(body.text))
    };

    getText(data, (result) => {
      let resultJson = JSON.parse(result);
      let resultEncrypt = {
        name: publicKey.encrypt(forge.util.encodeUtf8(resultJson.name)),
        result: publicKey.encrypt(forge.util.encodeUtf8(resultJson.result))
      };
      response.end(JSON.stringify(resultEncrypt));
      console.log("= = = POST: End = = =");
    });
  });
}


// = = = = = = = = = = = = =
// Miscellaneous Utility Functions
// = = = = = = = = = = = = =

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
 * @param {string} data The data to be sent to the Python backend.
 * @param {function} callback The function to be executed at conclusion.
 */
function getText(data, callback) {
  return pythonProcess("phrase", data, callback);
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
  console.log("= = = CHILD PROCESS: Start = = =");
  let { spawn } = require("child_process");
  // TODO: Change between "python" and "python3" as necessary
  let process = spawn("python", ["../python/conversation.py", command]);
  let dataString = "";

  process.stdout.on('data', (data) => {
    dataString += data.toString();
  });
  process.stdout.on('end', () => {
    console.log("= = = CHILD PROCESS: End = = =");
    return callback(dataString);
  });

  process.stderr.on('data', (data) => {
    console.log(`= = = CHILD PROCESS: Error - ${data} = = =`);
  });

  process.stdin.write(JSON.stringify(data));
  process.stdin.end();
}

module.exports = {
  handleGetRequest: handleGetRequest,
  handlePostRequest: handlePostRequest
};
