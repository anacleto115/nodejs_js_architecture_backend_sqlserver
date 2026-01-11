let IParser = require('lib_domain_context/IParser');
let PersonTypes = require('lib_domain_entities/Models/PersonTypes');

class PersonTypesParser extends IParser
{
    CreateEntity(ItemArray)
    {
        var response = new PersonTypes();
        response.SetId(ItemArray["id"]);
        response.SetName(ItemArray["name"]);
        return response;
    }

    ToEntity(data)
    {
        var response = new PersonTypes();
        response.SetId(data["Id"]);
        if ("Name" in data)
            response.SetName(data["Name"]);
        return response;
    }

    ToDictionary(entity)
    {
        var response = {};
        response["Id"] = entity.GetId();
        if (entity.GetName() != undefined)
            response["Name"] = entity.GetName();
        return response;
    }

    Validate(entity)
    {
        if (entity.GetName() == undefined)
            return false;
        return true;
    }
}

module.exports = PersonTypesParser;