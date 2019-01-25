const fs = require('fs');

// = = = = = = = = = = = = =
// Constants
// = = = = = = = = = = = = =

const chat = fs.createWriteStream(
  __dirname + "/logs/chat.json", {flags: 'a'});
const error = fs.createWriteStream(
  __dirname + "/logs/error.log", {flags: 'a'});
const request = fs.createWriteStream(
  __dirname + "/logs/request.log", {flags: 'a'});

/**
 * Logs chat data.
 *
 * Logs chat data in JSON format similar to that used in Facebook Messenger data
 * downloads.
 *
 * @param {string} sender_name The name of the person who sent the message.
 * @param {string} content A string indicating message content.
 * @returns {Promise<void>} Nothing.
 */
async function logToChat(sender_name, content) {
  let timestamp_ms = Date.now();
  let data = {
    sender_name: sender_name,
    timestamp_ms: timestamp_ms,
    content: content,
    type: "Generic"
  };
  chat.write(JSON.stringify(data, null, 2) + "\n");
}

/**
 * Logs error data.
 *
 * @param error The error that has occurred.
 * @returns {Promise<void>} Nothing.
 */
async function logToError(error) {
  let date = new Date().toString();
  console.log(`${date}: ERROR ==> ${error.toString()}`);
  error.write(date + ": " + error.toString() + "\n");
}

/**
 * Logs HTTP requests.
 *
 * @param {string} method The request method (e.g. "GET").
 * @param {string} status The request status (e.g. "start").
 * @returns {Promise<void>} Nothing.
 */
async function logToRequest(method, status) {
  let date = new Date().toString();
  request.write(date + ": " + method + " --- " + status + "\n");
}


module.exports = {
  logToChat: logToChat,
  logToError: logToError,
  logToRequest: logToRequest
};
