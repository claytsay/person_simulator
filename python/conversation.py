import datetime
from sys import stdin
from chat_utils import *

def conversation():
    # TODO: Get this to work.
    input_json = json.loads(stdin.readlines()[0])
    


def conversation_gui():
    """Allows a user to talk to a Person via command line interface.
    
    Asks the user to choose to talk to someone and continuously
    provides phrases from that person to continue the conversation.
    """

    # - - - - - - - - - - - -
    # VARIALE DECLARATIONS
    # - - - - - - - - - - - -
    version = "0.1.3"
    # TODO: Add timezone information
    data_date = datetime.datetime(2018, 10, 11, 22, 20)
    filenames_filename = "../data_example/filenames-examples.txt"
    # filenames_filename = "../data/filenames.txt"

    # Console strings
    divider = "- - - - - - - - - - - - - - - - - - - -"
    header = "<<< CONVERSATION {0} >>>"
    exit_token = "exit()"


    # - - - - - - - - - - - -
    # MECHANICS
    # - - - - - - - - - - - -

    # Get phrases from the file
    with open(filenames_filename, "r", encoding="utf-8") as filenames_file:
        filenames = list(map(lambda x: x.strip("\n"), filenames_file.readlines()))

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
    if not person.blocks:
        raise ValueError("person has no phrases: {0}".format(person_name))

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
    conversation_gui()
