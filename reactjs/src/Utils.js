// = = = = = = = = = = = = =
// Utility Functions
// = = = = = = = = = = = = =

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

export default makeRequest;
