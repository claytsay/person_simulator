# `person_simulator`

**Person Simulator** is a chatbot program designed to take data from instant
messaging logs (namely Facebook Messenger) to determine how to respond.

## Technical Details
Current version is **0.1.3**.

Written in Python 3.7.2, the program requires data formatted into a specific
JSON format for it to be able to read it (i.e. the format in which Facebook
gives users their profile data).

At this stage in the documentation, [`CHANGELOG.md`](CHANGELOG.md) has a lot of
information regarding the mechanics of how the program works.

## TODO
### Planned and Implemented Features
- [ ] Determine the best response to return in a given situation
- [ ] Support for emoji reactions
- [ ] Better UI
- [ ] Perhaps turn this into a web app (with Python backend)
- [ ] Clean up unnecessary Python comments
- [ ] Clean up README.md
- [X] Dynamically modify the number of messages returned at once
- [X] Filter out "invalid" messages (e.g. "Jay sent a photo.")
- [X] Take data from multiple chat logs
- [X] Parse "fuzzy input" with regards to names
- [X] Write better Python docs

### Ideas
- Use a neural network to determine if two chat messages are "connected"
(i.e. seperating the chat log into TextChains)
  