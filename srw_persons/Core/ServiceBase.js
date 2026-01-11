let IService = require('lib_domain_context/IService');
let TokenService = require('../Implementations/TokenService');
let Configuration = require('../Configuration');
let FactoryApplication = require('lib_application_core/Core/FactoryApplication');
let FactoryApplicationContext = require('lib_application_context/Core/FactoryApplicationContext');
let Enumerables = require('lib_domain_context/Enumerables');
let JsonHelper = require('lib_utilities/Utilities/JsonHelper');

class ServiceBase extends IService
{
    name;
    IApp;
    iToken;
    iConfiguration;
    
    Load(data)
    {
        this.iConfiguration = this.iConfiguration == null ? new Configuration() : this.iConfiguration;
        FactoryApplication.IFactoryApplication =
            FactoryApplication.IFactoryApplication == null ? new FactoryApplicationContext() : FactoryApplication.IFactoryApplication;
        if ("IApplication" in data)
            this.IApp = data["IApplication"];
        this.iToken = this.iToken == null ? new TokenService() : this.iToken;
        data["stringConnection"] = this.iConfiguration.Get("Default");
        var enumerables = new Enumerables();
        data["Architecture"] = enumerables.Architecture.Services;
        return data;
    }

    Select(data)
    {
        var response = {};
        try
        {
            data = this.Load(data);

            data = this.FuncValidate(data);
            if ("Error" in data)
                return data;

            response = this.IApp.Select(data);
            return response;
        }
        catch (ex)
        {
            response["Error"] = String(ex);
            return response;
        }
    }
    
    Insert(data)
    {
        var response = {};
        try
        {
            data = this.Load(data);

            data = this.FuncValidate(data);
            if ("Error" in data)
                return data;

            response = this.IApp.Insert(data);
            return response;
        }
        catch (ex)
        {
            response["Error"] = String(ex);
            return response;
        }
    }
    
    Update(data)
    {
        var response = {};
        try
        {
            data = this.Load(data);

            data = this.FuncValidate(data);
            if ("Error" in data)
                return data;

            response = this.IApp.Update(data);
            return response;
        }
        catch (ex)
        {
            response["Error"] = String(ex);
            return response;
        }
    }
    
    Delete(data)
    {
        var response = {};
        try
        {
            data = this.Load(data);

            data = this.FuncValidate(data);
            if ("Error" in data)
                return data;

            response = this.IApp.Delete(data);
            return response;
        }
        catch (ex)
        {
            response["Error"] = String(ex);
            return response;
        }
    }
    
    FuncValidate(data)
    {
        var response = { };
        try
        {
            if (!this.iToken.Validate(data))
            {
                response["Error"] = "NoAuthenticate";
                return response;
            }
            return data;
        }
        catch (ex)
        {
            response["Error"] = String(ex);
            return response;
        }
    }

    CreateApis(app)
    {
        var service = this;
        app.post(this.name + '/Select', function (req, res) {
            var body = [];
            req.on('data', (x) => { body.push(x); }).on('end', async() => {
                var income = Buffer.concat(body).toString();
                res.json(await service.Select(JsonHelper.ConvertToObject(income)));
            });
        });
        app.post(this.name + '/Insert', function (req, res) {
            var body = [];
            req.on('data', (x) => { body.push(x); }).on('end', async() => {
                var income = Buffer.concat(body).toString();
                res.json(await service.Insert(JsonHelper.ConvertToObject(income)));
            });
        });
        app.post(this.name + '/Update', function (req, res) {
            var body = [];
            req.on('data', (x) => { body.push(x); }).on('end', async() => {
                var income = Buffer.concat(body).toString();
                res.json(await service.Update(JsonHelper.ConvertToObject(income)));
            });
        });
        app.post(this.name + '/Delete', function (req, res) {
            var body = [];
            req.on('data', (x) => { body.push(x); }).on('end', async() => {
                var income = Buffer.concat(body).toString();
                res.json(await service.Delete(JsonHelper.ConvertToObject(income)));
            });
        });
    }
}

module.exports = ServiceBase;