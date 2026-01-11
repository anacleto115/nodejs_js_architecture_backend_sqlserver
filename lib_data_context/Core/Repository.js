let ConnectionSQL = require("./ConnectionSQL");

class Repository
{
    parser;
    connection;

    async Execute(data)
    {
        var response = {};
        try
        {
            this.connection = new ConnectionSQL();
            var list = new Array();
            var set = await this.connection.Execute(data);

            if ("Error" in set)
                return set;

            var temp = set["Table"][0];
            for (var pos in temp)
            {
                var item = temp[pos];
                list.push(this.parser.CreateEntity(item));
            }

            response["Entities"] = list;
            response["Response"] = "OK";
            return response;
        }
        catch (ex)
        {
            throw ex;
        }
    }

    async ExecuteNonQuery(data)
    {
        var response = {};
        try
        {
            this.connection = new ConnectionSQL();
            response = await this.connection.ExecuteNonQuery(data);

            if ("Error" in response)
                return response;
            response["Response"] = "OK";
            return response;
        }
        catch (ex)
        {
            throw ex;
        }
    }
}

module.exports = Repository;