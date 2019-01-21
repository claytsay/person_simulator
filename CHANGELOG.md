# Changelog

## Version 0.2.1
- Migrated the React frontend from GitHub Pages to Node.js
  - Changed URLs around in [handler.js](nodejs/handler.js)
- Changed the Node.js backend to use Express
- Made formatting changes to the UI
  - UI based on that of
  [Facebook Messenger](https://en.wikipedia.org/wiki/Facebook_Messenger)
  - Added some sample cards/data in order to test formatting changes (see 
  [`ChatComps.js`](reactjs/src/ChatComps.js))
- Disaggregated React components in [`ChatComps.js`](reactjs/src/ChatComps.js)
- Resolved miscellaneous formatting issues:
  - Fixed `README.md`
  - Added semicolons to various `.js` files

## Version 0.2.0
At this stage, the program doesn't really work as the React frontend on GitHub
Pages cannot communicate with the Node.JS backend due to a HTTPS/HTTP mismatch.
Persistent programmers may be able to get it to work locally though.

- Created a Node.JS backend to serve information
  - `GET` requests are served a list of all the names available to the Python
  backend
  - `POST` requests are served with what the Python backend determines to be
  the best phrase to be "spoken" in a certain context.
    - Must have a JSON payload with a `name` parameter stating who is to "speak"
    and a `context` parameter which essentially is what the user typed in
  - File descriptors:
    - [`handler.js`](nodejs/handler.js): Does the main work of handling HTTP
    requests. Contains functions that interface with the Python backend.
    - [`start.js`](nodejs/start.js): Starts the server and redirects HTTP
    requests to their appropriate handling functions in `handler.js`.
- Modified the Python backend to be able to interface with Node.JS
  - [`conversation.py`](python/conversation.py) is used to interface with
  Node.JS
    - `get_names`: A function that gets all the names available to the Python
    backend. Meant to serve `GET` requests.
    - `get_phrases`: A function that gets the appropriate phrase given a
    context. Meant to serve `POST` requests.
- Created a React frontend to communicate with the backend(s)
  - Created a snappy-looking icon: [`favicon.ico`](reactjs/public/favicon.ico)
  - File descriptors:
    - [`AuthComps.js`](reactjs/AuthComps.js): Responsible for components used in
    creating a secure (pseudo-HTTPS) client-server connection.
    - [`ChatComps.js`](reactjs/ChatComps.js): Handles the UI for entering and
    displaying chat information.
- Moved TODO to its own file: [`TODO.md`](TODO.md)
- Updated `README.md`


## Version 0.1.3
- Redeveloped how text data is stored in the program
  - [`text_utils.py`](python/text_utils.py)
    - `TextBlock`: represents a collection of texts, analogous to one person
    describing a complete idea through multiple sentences
    - `TextChain`: represents a period/line of conversation; composed of
    `TextBlock`s
  - [`chat_utils.py`](python/chat_utils.py)
    - `Chat`: functions similarly to before but now configured to use
    `TextBlock` and `TextChain`
    - `Person`: functions similarly, but now has a better text selection
    algorithm (see below)
- Redeveloped how texts are selected: `get_text_ratio`
  - `TextBlock`s carry data regarding what context they were sent in (currently
  only includes the `TextBlock` immediately prior)
  - The user's input phrase is compared to see which context it matches best
  - From the results, a `TextBlock` is selected
- Added basic frameworks for the backend and frontend of the anticipated web
app
- Updated Python docstrings to follow the
[Google format](https://github.com/google/styleguide/blob/gh-pages/pyguide.md)
- Renamed and reorganized some files


## Version 0.1.2
- Re-uploaded to GitHub
- Put in `Phrase` class that represents a spoken phrase. (Not currently used.)


## Version 0.1.1
- Changed `conversation_repl()` to take filenames from a seperate text file
rather than a `list` written into `person_simulator.py`
- Miscellaneous changes


## Version 0.1.0
- Initial release
