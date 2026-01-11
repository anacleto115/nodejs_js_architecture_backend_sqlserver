class Enumerations
{
    Types =
    {
	    Persons: 0,
	    PersonTypes: 1,
    };

    Architecture =
    {
	    StandAlone: 0,
	    Services: 1,
    };

    Message =
    {
        MESSAGE: 0,
        QUESTION: 1,
    };

    Loading =
    {
        ADD: 0,
        REMOVE: 1,
    };

    Action =
    {
	    OPEN: 0,
	    CLOSE: 1,
    };
}

module.exports = Enumerations;