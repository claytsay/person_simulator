from difflib import get_close_matches
from random import choice
from string import capwords
from text_utils import *


class Chat:
    """Represents a chat with certain people.
    
    Data is stored as a list of TextChains.

    Attributes:
        all_names: A class set that contains the names of all the
            participants in all instances of Chat.
        blocks: A list that has all of the chat's TextBlocks (as
            obtained from the chat's TextChains).
        chains: A list that has all of the chat`s TextChains.
        illegal_tokens: A class frozenset that has short phrases that
            indicate that a text is not really "spoken" by a person.
        
    """

    # Static/class attributes
    illegal_tokens = frozenset([
        " added ",
        " created a poll: ",
        " created the group.",
        " changed the group photo.",
        " named the group ",
        " nickname to ",
        " sent a GIF ",
        " sent a location.",
        " sent a photo.",
        " sent a sticker.",
        " sent a voice message.",
        " sent an attachment.",
        " voted for ",
        " waved at "
    ])
    all_participants = set()

    def __init__(self, filename='message.json'):
        """Initializes an instance of Chat.

        Args:
            filename: The name of the file from which the Chat is to take
                data from in its construction.
        """

        # Assert(s)
        assert type(filename) == str, "'filename' must be a string"

        # Load the information from the specified file
        # TODO: Support UTF-8?
        # https://stackoverflow.com/questions/6289474/working-with-utf-8-encoding-in-python-source
        with open(filename, "r",  encoding="utf-8") as data_file:
            data_json = json.loads("".join(data_file.readlines()))

        # Organize the texts into TextBlocks
        # TODO: Find some way to divide TextChains "apart"
        messages = data_json["messages"]
        name_prev = None
        contents = []
        blocks = []
        for message in messages:
            name_curr = message["sender_name"]
            content = message["content"]
            if name_prev is None:
                name_prev = name_curr
            if name_curr != name_prev:
                if contents:
                    blocks.append(TextBlock(name_prev, list(reversed(contents))))
                    contents.clear()
                name_prev = name_curr
            if not Chat.is_invalid(content):
                contents.append(content)
        blocks.reverse()
        self.chains = []
        self.chains.append(TextChain(blocks))

        # Put all of the names 
        participants = list(
            map(lambda x: x["name"], data_json["participants"])
        )
        self.participants = frozenset(participants)
        Chat.all_participants = Chat.all_participants.union(self.participants)

    def get_blocks(self, name):
        """Returns a list of all of the TextBlocks with a specific name
        from self's TextChains.

        Args:
            name: The name whose associated TextBlocks is to be gotten.

        Returns:
            A list[TextBlock] of blocks with name attribute name.
        """

        result = []
        for chain in self.chains:
            result.extend(chain.get_blocks())
        return result

    @staticmethod
    def is_invalid(phrase):
        """Determines if a phrase is invalid based on illegal_tokens.

        Args:
            phrase: The phrase whose validity is to be tested.
        
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
    """Represents a person and all of their texts.

    Takes its data from numerous Chats.

    Attributes:
        name: The name of the Person.
        chains: A list of TextChains from which the person sources
            its TextBlocks.
        blocks: A list of all the TextBlocks from the provided chats
            that the person spoke (based on name). 
    """

    def __init__(self, name, chats):
        """Initializes a Person.
        
        Args:
            name: The name of the person.
            chats: A list of Chat instances from which the person takes
                its data (i.e. texts).
        """

        # Assert(s)
        assert type(name) == str, "'name' must be a string."
        assert type(chats) == list, "'chats' must be a list."

        # Accessing and storing information
        self.name = Person.name_processor(name)
        # Perhaps deprecate self.blocks or self.chains?
        self.chains = []
        for chat in chats:
            if self.name in chat.participants:
                self.chains.extend(chat.chains)
        self.blocks = []
        for chain in self.chains:
            self.blocks.extend(chain.get_blocks(self.name))

    def get_text_random(self):
        """Returns the contents (a list of strings) of a TextBlock
        taken randomly from self.
        """

        return choice(self.blocks).content

    def get_text_ratio(self, context=None):
        """Returns a list of responses taken from a Person that utilises
        the Phrase method context_match to find the best responses.
        
        Args:
            context: The context that is to be compared to the context
                of the current Person instance.
        
        Returns:
            A list of strings taken from the best-chosen TextBlock as
            determined by context similarity. If no best TextBlock is
            identified, chooses a random one instead.
        """

        if not context:
            return self.get_text_random()
        block_ratios = {block : block.context_match(context) for block in self.blocks}
        block_ratios = [x[0] for x in sorted(block_ratios.items(), key=lambda x: x[1])]
        # TODO: Perhaps optimize this random-ness
        if len(block_ratios) == 0:
            return self.get_text_random()
        elif len(block_ratios) < 5:
            return choice(block_ratios).content
        else:
            return choice(block_ratios[:5]).content

    @staticmethod
    def name_processor(name):
        """Takes a potentially fuzzy name and attempts to find the
        "correct" name that it is supposed to represent. Takes data
        from Chat.all_participants.
        
        Args:
            name: The name that is to be processed.

        Returns:
            A string that represents what the name could have been,
            taken from Chat.all_participants.

        Raises:
            ValueError: If the input name cannot be linked to a name
                in Chat.all_participants.
        """

        name = capwords(name)
        if name in Chat.all_participants:
            return name
        try:
            return get_close_matches(name, Chat.all_participants)[0]
        except IndexError:
            raise ValueError("invalid name: {0}".format(name))
        # finally:
        #     pass

