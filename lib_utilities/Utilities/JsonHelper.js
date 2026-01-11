class JsonHelper
{
    static ConvertToString(data)
    {
        return JSON.stringify(data);
    }

    static ConvertToObject(data)
    {
        return JSON.parse(data);
    }
}

module.exports = JsonHelper;