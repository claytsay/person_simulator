# Changelog

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
- Updated Python docstrings to follow the [Google format](https://github.com/google/styleguide/blob/gh-pages/pyguide.md)
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