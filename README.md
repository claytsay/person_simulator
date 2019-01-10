# Python_Person_Simulator

**Python Person Simulator** is a chatbot program designed to take data from instant messaging logs (namely Facebook Messenger) to determine how to respond.

## Technical Details
Written in Python 3.7.2, the program requires data formatted into a specific JSON format for it to be able to read it (i.e. the format in which Facebook gives users their profile data).

## Planned and Implemented Features
  - [ ] Dynamically modify the number of messages returned at once
  - [ ] Determine the best response to return in a given situation
  - [ ] Support for emoji reactions
  - [ ] Better UI
  - [ ] Perhaps turn this into a web app (with Python backend)
  - [X] Filter out "invalid" messages (e.g. "Jay sent a photo.")
  - [X] Take data from multiple chat logs
  - [X] Parse "fuzzy input" with regards to names
  