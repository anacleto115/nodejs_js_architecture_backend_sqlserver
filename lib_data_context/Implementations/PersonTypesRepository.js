let Repository = require('../Core/Repository')
let IPersonTypesRepository = require('lib_data_core/Interfaces/IPersonsRepository');
let PersonTypesParser = require('lib_infrastructure/Implementations/PersonTypesParser');
let Parameters = require('lib_data_core/Core/Parameters');

class PersonTypesRepository extends IPersonTypesRepository
{
    repository = new Repository();

    constructor(data)
    {
        super();
        this.repository.parser = new PersonTypesParser();
    }
    
    async Select(data)
    {
        var response = {};
        try
        {
            var parameters = new Array();
            data["Parameters"] = parameters;
            data["Procedure"] = "sp_select_per_types";
            response = await this.repository.Execute(data);
            return response;
        }
        catch (ex)
        {
            response["Error"] = String(ex);
            return response;
        }
    }

    async Insert(data)
    {
        throw "Not Implemented";
    }

    async Update(data)
    {
        throw "Not Implemented";
    }

    async Delete(data)
    {
        throw "Not Implemented";
    }
}

module.exports = PersonTypesRepository;