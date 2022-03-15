/* Fill this in with the URL you get from the web page linked in the assignment spec. */
let API_URL = "/api";

/* Uncomment this line to point requests at your local server. The server only supports a couple of
   hardcoded routes, but it should still allow you to do most of part 3 offline, if necessary. */
//API_URL = "/api";

/* Do not modify or remove this line. It allows us to redirect the API for grading. */
if (window.API_URL) API_URL = window.API_URL;

/* Subclass of Error for representing HTTP errors returned from the API.
   Exposes a status (the HTTP response status code) and message (a user-facing message). */
export class HTTPError extends Error {
  /* status is the HTTP status, message is a user-facing error message. */
  constructor(status, message) {
    /* Call the Error constructor with the given message. */
    super(message);
    this.status = status;
  }
}

/* Make an API request.
   - method is the HTTP method.
   - path is the URI. It must begin with a /. API_URL will be prepended.
   - body (optional) is the request body as a JS object that can be converted to JSON.

   The API is assumed to return JSON. If the response status is 200, the response body (as a JS object) is returned.
   If the response has any other status, an HTTPError is thrown, with its status set to the response status and its
   message set to value of the "error" property of the response, which we assume is a user-facing error message. */
const apiRequest = async (method, path, body = null) => {
  let url = API_URL + path;
  console.log(url)
  if (body) {
    body = JSON.stringify(body);
  }
  let response = await fetch(url, {
    method: method,
    headers: {"Content-Type": "application/json"},
    body: body
  });
  let data = await response.json();
  if (response.status !== 200) {
    alert(new Error(data.error));
  }
  return data;
};

/* This line exposes the apiRequest function in the console, so you can call it for testing. */
window.apiRequest = apiRequest;

export default apiRequest;