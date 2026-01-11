let IApplication = require('lib_domain_context/IApplication')
let FactoryRepository = require('lib_data_core/Core/FactoryRepository')
let FactoryRepositoryContext = require('lib_data_context/Core/FactoryRepositoryContext')

class App extends IApplication
{
    parser = undefined;
    IRepository;
    
    Load(data)
    {
        FactoryRepository.IFactoryRepository =
            FactoryRepository.IFactoryRepository == null ? new FactoryRepositoryContext() : FactoryRepository.IFactoryRepository;
        if ("IRepository" in data)
            this.IRepository = data["IRepository"];
        return data;
    }

    async Select(data)
    {
        var response = {};
        try
        {
            data = this.Load(data);
            response = await this.IRepository.Select(data);
            if (this.parser != null && "Entities" in response)
            {
                var list = response["Entities"];
                var dict = {};
                var count = 0;
                for (var pos in list)
                {
                    var item = list[pos];
                    dict[count] = this.parser.ToDictionary(item);
                    count++;
                }
                response["Entities"] = dict;
            }
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
        var response = {};
        try
        {
            data = this.Load(data);
            if (!("Entity" in data))
                return { "Error": "lbMissingInfo" };
            if (this.parser != undefined)
                data["Entity"] = this.parser.ToEntity(data["Entity"]);
            if (this.parser != undefined && !this.parser.Validate(data["Entity"]))
                return { "Error": "lbMissingInfo" };
            response = await this.IRepository.Insert(data);
            if (this.parser != undefined && "Entity" in response)
                response["Entity"] = this.parser.ToDictionary(response["Entity"]);
            return response;
        }
        catch (ex)
        {
            response["Error"] = String(ex);
            return response;
        }
    }
    
    async Update(data)
    {
        var response = {};
        try
        {
            data = this.Load(data);
            if (!("Entity" in data))
                return { "Error": "lbMissingInfo" };
            if (this.parser != undefined)
                data["Entity"] = this.parser.ToEntity(data["Entity"]);
            if (this.parser != undefined && !this.parser.Validate(data["Entity"]))
                return { "Error": "lbMissingInfo" };
            response = await this.IRepository.Update(data);
            if (this.parser != undefined && "Entity" in response)
                response["Entity"] = this.parser.ToDictionary(response["Entity"]);
            return response;
        }
        catch (ex)
        {
            response["Error"] = String(ex);
            return response;
        }
    }
    
    async Delete(data)
    {
        var response = {};
        try
        {
            data = this.Load(data);
            if (!("Entity" in data))
                return { "Error": "lbMissingInfo" };
            if (this.parser != undefined)
                data["Entity"] = this.parser.ToEntity(data["Entity"]);
            if (this.parser != undefined && !this.parser.Validate(data["Entity"]))
                return { "Error": "lbMissingInfo" };
            response = await this.IRepository.Delete(data);
            if (this.parser != undefined && "Entity" in response)
                response["Entity"] = this.parser.ToDictionary(response["Entity"]);
            return response;
        }
        catch (ex)
        {
            response["Error"] = String(ex);
            return response;
        }
    }
}

module.exports = App;