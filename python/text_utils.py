from difflib import SequenceMatcher
import json


class TextBlock:
    """
    Represents a block of text.
    
    Carries with it the identity of the person who wrote/produced the
    block as well as in what context it was created in.

    Attributes:
        content: A list of strings holding what texts compose the
            block.
        name: A string indicating the name of the person who made it.
        sequence_matcher: An instance of difflib.SequenceMatcher that
            is used to compare the block with other blocks.
    """

    def __init__(self, name, content):
        """Initializes an instance of TextBlock.
        
        Args:
            name: A string representing the name of the person who
                produced the TextBlock.
            content: A list of strings representing the contents of
                the block. Each string represents a seperate message.
        """

        self.name = name
        self.content = list(content)
        self.sequence_matcher = SequenceMatcher()

    def __str__(self):
        result = ""
        for text in self.content:
            result += text + "\n"
        return result[:len(result) - 2]

    def context_match(self, context):
        """Determines how well the given context matches with the
        block's context.
        
        Args:
            context: A TextBlock which is compared against the
                current block's context block for similarity.
        
        Returns:
            A float between 0 and 1 depending on how well the given
            context matches the TextBlock's context. The closer to 1
            the better the match.
        """

        # TODO: Take into account all of the phrases, not just one
        if not self.content:
            return 0
        self.sequence_matcher.set_seq1(self.content[0])
        self.sequence_matcher.set_seq2(context.content[-1])
        return self.sequence_matcher.ratio()


class TextChain:
    """Represents a chain of TextBlocks.
    
    Practically speaking, represents one session of dialogue between
    participating parties.

    Attributes:
        blocks: A list of all of the blocks in the chain.
        names: A set of all of the names of the block creators in
            the chain.
    """

    def __init__(self, blocks=[]):
        """Constructs an instance of TextChain.
        
        Args:
            blocks: A list of TextBlocks from which the chain is
                composed of.
        """
        # TODO: Maybe add a better doctest?

        self.blocks = list(blocks)
        self.names = set(map(lambda x: x.name, self.blocks))
        blocks[0].context = None
        for i in range(1, len(blocks)):
            blocks[i].context = blocks[i - 1]

    def __str__(self):
        result = ""
        for block in self.blocks:
            result += block.__str__() + "\n"
        return result[:len(result) - 2]

    def get_blocks(self, name):
        """Gets all the blocks created by a certain person.

        Args:
            name: A string representing the name of the person to
                to be "queried."
        
        Returns:
            A list of all of the TextBlocks within self that are
                spoken by the person with a certain name.
        """

        return [block for block in self.blocks if block.name == name]

