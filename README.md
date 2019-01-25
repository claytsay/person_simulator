# `person_simulator`

**`person_simulator`** is a chatbot program designed to take data from instant
messaging logs (namely Facebook Messenger) to determine how to respond.

## Technical Details
Current version is **0.3.1**.

At this stage in the documentation, [`CHANGELOG.md`](CHANGELOG.md) has a lot of
information regarding the mechanics of how the program works.

The project is divided into three main sections.

### [`nodejs`](nodejs/)
[Node.js](https://nodejs.org/en/about/) is used to run a server.
[Express](https://expressjs.com/) is used within Node.js to make the server
easier to program. [Forge](https://www.npmjs.com/package/node-forge) is used
for encrypting traffic to and from the server. This server is sort of like an
API that provides information to the front-end chatbot webpage when it is asked
to. REST-ful status is unconfirmed.

### [`python`](python/)
[Python 3.7.2](https://www.python.org/about/) is used to do the "heavy lifting"
in the server backend. It takes chat data formatted into a very specific JSON 
format (i.e. the format in which Facebook gives users their profile data) and 
determines what the best response is in a given situation.

### [`reactjs`](reactjs/)
[React](https://reactjs.org/) is used to create the front-end chatbot. Also
utilises Forge to encrypt/decrypt data. It sends requests to the server based
on user input and displays the result to the user.

### Code Breakdown
As of version 0.3.1, there are **1,632** lines of code in the project.

|            | `nodejs` | `python` | `reactjs` | Other    |**TOTAL**  |
|------------|----------|----------|-----------|----------|-----------|
| CSS        | 0        | 0        | 93        | 0        | 93        |
| HTML       | 0        | 0        | 131       | 0        | 131       |
| JavaScript | 356      | 0        | 340       | 0        | 696       |
| Markdown   | 0        | 0        | 0         | 221      | 221       |
| Python     | 0        | 491      | 0         | 0        | 491       |
| **TOTAL**  | 356      | 491      | 564       | 221      | **1632**  |

Some notes about these values:
- Generally, the lines counted were only those that were developer-written
(rather than provided in a template)
- HTML inside the React JSX was counted as HTML, not JavaScript
- Comments inside programs (e.g. Javadocs) were counted
