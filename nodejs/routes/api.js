var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');

/* GET list of people. */
router.get('/', handleGetRequest);

/* POST chat message. */
router.post('/', handlePostRequest);



/**
 * The URL from which to allow access (i.e. from Allow-Access-Control-Origin).
 * @type {string}
 */
const urlAcao = "http://clay.tsay.us/projects/person_simulator";

// = = = = = = = = = = = = =
// Request-Handling Functions
// = = = = = = = = = = = = =

/**
 * Handles a GET request to the server.
 *
 * @param {IncomingMessage} req The incoming HTTP request. Is
 *  not used at all in the function.
 * @param {ServerResponse} res The outgoing HTTP response.
 */
function handleGetRequest(req, res) {
  res.writeHead(200, {
    "Access-Control-Allow-Origin": urlAcao,
    "Content-Type": "application/json"
  });

  getNames((result) => {
    res.end(result);
  });
}

/**
 * Handles a POST request to the server.
 *
 * Is actually a pure function. Doesn't really "post" anything: It's
 * more of a GET request with certain parameters.
 *
 * @param {IncomingMessage} req The incoming HTTP request.
 * @param {ServerResponse} res The outgoing HTTP response.
 */
function handlePostRequest(req, res) {
  let body = [];
  req.on('error', (err) => {
    console.error(err);

  }).on('data', (chunk) => {
    body.push(chunk);

  }).on('end', () => {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": urlAcao,
      "Content-Type": "application/json"
    });

    // Get and decrypt the data
    body = JSON.parse(Buffer.concat(body).toString());
    let data = {
      name: body.name,
      context: body.text
    };

    // Utilise the client-sent data
    getText(data, (result) => {
      // Send it back to the client
      res.end(result);
    });
  });
}


// = = = = = = = = = = = = =
// Miscellaneous Utility Functions
// = = = = = = = = = = = = =

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
  let { spawn } = require("child_process");
  // TODO: Change between "python" and "python3" as necessary
  let process = spawn("python", [path.join(__dirname, "../../python/conversation.py"), command]);
  let dataString = "";

  process.stdout.on('data', (data) => {
    dataString += data.toString();
  });
  process.stdout.on('end', () => {
    return callback(dataString);
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

module.exports = router;
