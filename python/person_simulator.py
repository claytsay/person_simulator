import datetime
import difflib
import json
import random
import string


# TODO: Support UTF-8?
# https://stackoverflow.com/questions/6289474/working-with-utf-8-encoding-in-python-source

version = "0.1.1"
# TODO: Add timezone information
data_date = datetime.datetime(2018, 10, 11, 22, 20)
filenames_filename = "filenames-examples.txt"
with open(filenames_filename, "r", encoding="utf-8") as filenames_file:
    filenames = list(map(lambda x: x.strip("\n"), filenames_file.readlines()))


class Chat:
    """
    Represents a Facebook Messenger chat. Takes in data formatted into JSON.
    """

    # Static/class attributes
    illegal_tokens = frozenset([
        " added ",
        " created a poll: ",
        " created the group.",
        " changed the group photo.",
        " named the group ",
        " nickname to ",
        " sent a location.",
        " sent a photo.",
        " sent a sticker.",
        " sent a voice message.",
        " sent an attachment.",
        " voted for "
    ])
    # TODO: Determine if "names" is actually necessary
    names = set()

    def __init__(self, filename='message.json'):
        # Assert(s)
        assert type(filename) == str, "'filename' must be a string"

        # Load the information from the specified file
        with open(filename, "r",  encoding="utf-8") as data_file:
            data_json = json.loads("".join(data_file.readlines()))

        # Sort all of the phrases according to who typed them
        self.phrases_dict = {}
        messages = data_json["messages"]
        for message in messages:
            name = message["sender_name"]
            phrase = message["content"]
            if Chat.is_invalid(phrase):
                continue
            if name in self.phrases_dict:
                self.phrases_dict[name].append(phrase)
            else:
                self.phrases_dict[name] = [phrase]

        # Put all of the names into the class set
        # TODO: Process the dict into a list
        participants = list(
            map(lambda x: x["name"], data_json["participants"])
        )
        Chat.names.update(participants)

    def get_phrases(self, name):
        """Gets all the phrases spoken by a person of a certain name in the Chat.
        If that person did not say anything, an empty list is returned.
        """
        return self.phrases_dict.get(name, [])

    @staticmethod
    def is_invalid(phrase):
        """Determines if a phrase is invalid based on illegal_tokens.

        >>> Chat.is_invalid("Hello!")
        False
        >>> Chat.is_invalid("Keren sent a photo.")
        True
        """
        for token in Chat.illegal_tokens:
            if token in phrase:
                return True
        return False


class Person:
    """
    Represents a person that says things according to a predetermined set of
    'things to say' taken from a Chat.
    """

    def __init__(self, name, chats):
        """Takes in a name and a list of Chats from which phrases are compiled."""
        # Assert(s)
        assert type(name) == str, "'name' must be a string."
        assert type(chats) == list, "'chats' must be a list."

        # Accessing and storing information
        self.name = Person.name_processor(name)
        phrases = []
        for chat in chats:
            phrases.extend(chat.get_phrases(self.name))
        self.phrases = tuple(phrases)

    def speak(self, times=1):
        """Returns a list of phrases taken randomly from a person."""

        assert type(times) == int, "'times' must be an int"
        return random.sample(self.phrases, times)

    @staticmethod
    def name_processor(name):
        """Takes a potentially fuzzy name and attempts to find the "correct"
        name that it is supposed to represent. Takes data from Chat.names."""

        # Thank goodness I didn't have to write capwords myself!
        name = string.capwords(name)
        if name in Chat.names:
            return name
        # TODO: Add error handling to this (i.e. if there are no matches,
        # the program fails)
        return difflib.get_close_matches(name, Chat.names)[0]

        # try:
        #     return difflib.get_close_matches(name, Chat.names)[0]
        # except IndexError as ie:
        #
        # finally:
        #     pass


class Phrase:
    """
    Represents a phrase spoken by a certain person in a certain context.
    """
    # TODO: Support multi-text contexts?

    def __init__(self, text, context=""):
        self.text = text
        self.context = list(context)
        self.sequence_matcher = difflib.SequenceMatcher(a=text)

    def contextMatch(self, context):
        """Returns a float between 0 and 1 depending on how well the given
        context matches the Phrase's context. The closer to 1 the better
        the match."""
        self.sequence_matcher.set_seq2(context)


def conversation_repl():
    """Asks the user to choose to talk to someone and continuously provides
    phrases from that person to continue the conversation."""

    # Declare some variable(s)
    divider = "- - - - - - - - - - - - - - - - - - - -"

    # Print out a header "banner"
    print(
        "Python Person Simulator (JSON Edition)",
        "Version: " + version,
        "Data last updated: " + data_date.__str__(),
        divider,
        sep="\n"
    )

    # Ask for names
    user_name = input("What is your name? ")
    person_name = input("Who would you like to talk to? ")

    # Instantiate the Person
    chats = [Chat(filename) for filename in filenames]
    person = Person(person_name, chats)
    if not person.phrases:
        raise ValueError("invalid person name: {0}".format(person_name))

    # Determine which level to indent the chat
    indent = max(len(user_name), len(person_name)) + 3
    user_prefix = user_name + ':' + ' '*(indent - (len(user_name) + 1))
    person_prefix = person.name + ':' + ' '*(indent - (len(person.name) + 2))

    # Start the REPL
    print(
        divider,
        "<<< CONVERSATION START >>>",
        "(Input 'exit()' to terminate the conversation.)\n",
        sep="\n"
    )
    while True:
        user_input = input(user_prefix)
        if user_input == "exit()":
            break
        person_responses = person.speak()
        for response in person_responses:
            print(person_prefix, response)
    print(
        divider,
        "<<< CONVERSATION END >>>",
        sep="\n"
    )


if __name__ == "__main__":
    conversation_repl()
