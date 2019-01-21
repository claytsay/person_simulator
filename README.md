# `person_simulator`

**`person_simulator`** is a chatbot program designed to take data from instant
messaging logs (namely Facebook Messenger) to determine how to respond.

## Technical Details
Current version is **0.2.1**.

At this stage in the documentation, [`CHANGELOG.md`](CHANGELOG.md) has a lot of
information regarding the mechanics of how the program works.

The project is divided into three main sections.

### [`nodejs`](nodejs/)
[Node.js](https://nodejs.org/en/about/) is used to run a server.
[Express](https://expressjs.com/) is used within Node.js to make the server
easier to program. This server is sort of like an API that provides information
to the front-end chatbot webpage when it is asked to. REST-ful status is
unconfirmed.

### [`python`](python/)
[Python 3.7.2](https://www.python.org/about/) is used to do the "heavy lifting"
in the server backend. It takes chat data formatted into a very specific JSON 
format (i.e. the format in which Facebook gives users their profile data) and 
determines what the best response is in a given situation.

### [`reactjs`](reactjs/)
[React](https://reactjs.org/) is used to create the front-end chatbot. It sends
requests to the server based on user input and displays the result to the user.
