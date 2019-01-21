/* Responsible for starting the server. */

const handler = require("./handler.js");
const path = require("path");
const express = require("express");
const app = express();
const port = 80;

app.use(
  "/person_simulator/static",
  express.static(path.join(__dirname, "../reactjs/build/static"))
);
app.get("/person_simulator", (request, result) => {
  result.sendFile(path.join(__dirname + "/../reactjs/build/index.html"));
});
app.get("/person_simulator/api", handler.handleGetRequest);
app.post("/person_simulator/api", handler.handlePostRequest);

app.listen(port, () => {
  console.log(`Server running! Listening on port ${port}.`);
});

/**
 * TODO
 * @param {*} key
 */
function verifyKey(key) {
  return key == "aoeu" ? true : false;
}

