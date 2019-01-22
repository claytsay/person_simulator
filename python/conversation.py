import datetime
from sys import argv, stdin
from chat_utils import *


filenames_filename = "../data_example/filenames-examples.txt"
# filenames_filename = "../data/filenames.txt"

def get_names():
    """Gets all the names in all the chats.

    NodeJS-compatible. Receives arguments via stdin and outputs via
    stdout. Outputs a stringified JSON array with all the names of all
    the people in the chats specified under filenames_filename.
    """

    # TODO: Reformat lines to conform to PEP-8
    names = set()
    with open(filenames_filename, "r", encoding="utf-8") as filenames_file:
        filenames = list(map(lambda x: x.strip(
            "\n"), filenames_file.readlines()))
    for filename in filenames:
        with open(filename, "r",  encoding="utf-8") as data_file:
            data_json = json.loads("".join(data_file.readlines()))
            names.update(map(lambda x: x["name"], data_json["participants"]))
    print(json.dumps(list(names)))
        

def load_person(name):
    """"Creates a Person.
    
    Constructs an instance of Person based on filenames_filename and
    a given name. Able to take fuzzy input.

    Args:
        name: A string representing the name of the Person.
    """

    with open(filenames_filename, "r", encoding="utf-8") as filenames_file:
        filenames = list(map(lambda x: x.strip(
            "\n"), filenames_file.readlines()))
    chats = [Chat(filename) for filename in filenames]
    person = Person(name, chats)
    if not person.blocks:
        raise ValueError("person has no phrases: {0}".format(name))
    return person


def get_phrase():
    """A NodeJS-compatible version of conversation_gui.

    Does not have a GUI. Receives arguments via stdin and returns via
    stdout. Takes in a JSON object in string format with attributes:
        name: A string representing the name of the person to get
            texts from.
        context: A string representing the context of the text (i.e.
            the user input).
    """
    # TODO: Optimise this code.
    input_json = json.loads(stdin.readlines()[0])
    person = load_person(input_json["name"])
    context = TextBlock(None, input_json["context"])
    result = person.get_text_ratio(context)
    print(json.dumps({
        "name": person.name,
        "result": result
    }))


def conversation_gui():
    """Allows a user to talk to a Person via command line interface.

    Asks the user to choose to talk to someone and continuously
    provides phrases from that person to continue the conversation.
    """

    # - - - - - - - - - - - -
    # VARIALE DECLARATION/INITIALIZATION
    # - - - - - - - - - - - -
    divider = "- - - - - - - - - - - - - - - - - - - -"
    header = "<<< CONVERSATION {0} >>>"
    exit_token = "exit()"
    # TODO: Add timezone information
    data_date = datetime.datetime(2018, 10, 11, 22, 20)

    with open("../VERSION.md", "r", encoding="utf-8") as version_file:
        version = version_file.readline()[:-1]

    # - - - - - - - - - - - -
    # MECHANICS
    # - - - - - - - - - - - -

    # Print out a header "banner"
    print(
        "person_simulator",
        "(JSON Edition, Python backend)",
        "Version: " + version,
        "Data last updated: " + data_date.__str__(),
        divider,
        sep="\n"
    )

    # Ask for names
    user_name = input("What is your name? ")
    person_name = input("Who would you like to talk to? ")

    # Instantiate the Person
    person = load_person(person_name)

    # Determine which level to indent the chat
    indent = max(len(user_name), len(person.name)) + 3
    user_prefix = user_name + ':' + ' '*(indent - (len(user_name) + 1))
    person_prefix = person.name + ':' + ' '*(indent - (len(person.name) + 2))

    # Start the REPL
    print(
        divider,
        header.format("START"),
        "(Input '{0}' to terminate the conversation.)\n".format(exit_token),
        sep="\n"
    )
    while True:
        user_input = input(user_prefix)
        if user_input == exit_token:
            break
        user_block = TextBlock(None, [user_input])
        person_responses = person.get_text_ratio(user_block)
        for response in person_responses:
            print(person_prefix, response)
    print(
        divider,
        header.format("END"),
        sep="\n"
    )


if __name__ == "__main__":
    if argv[1] == "names":
        get_names()
    elif argv[1] == "phrase":
        get_phrase()
    else:
        raise ValueError("Invalid command line argument.")
