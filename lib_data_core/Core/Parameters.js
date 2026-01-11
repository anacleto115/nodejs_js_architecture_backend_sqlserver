class Parameters
{
    Name;
    Type;
    Value;
    Direction = false;

    constructor(name, type, value, direction)
    {
        this.Name = name;
        this.Type = type;
        this.Value = value;
        this.Direction = direction;
    }
}

module.exports = Parameters;