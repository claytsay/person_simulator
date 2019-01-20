/* Responsible for starting the server. */

const http = require("http");
const hostname = "127.1.0.0";
const port = 80;
const server = http.createServer(requestHandler);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


/**
 * Handles requests for text data.
 * 
 * @param {IncomingMessage} request The incoming HTTP request.
 * @param {ServerResponse} response The outgoing HTTP response.
 */
function requestHandler(request, response) {
  var handler = require("./handler.js");
  switch(request.method) {
    case "GET":
      handler.handleGetRequest(request, response);
      break;
    case "POST":
      handler.handlePostRequest(request, response);
      break;
    default:
      console.log("= = = ERRROR: Invalid request = = =");
      break;
  }
}


/**
 * TODO
 * @param {*} key 
 */
function verifyKey(key) {
  return key == "aoeu" ? true : false;
}

