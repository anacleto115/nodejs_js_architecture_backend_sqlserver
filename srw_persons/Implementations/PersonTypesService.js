let ServiceBase = require('../Core/ServiceBase')
let IPersonTypesService = require('lib_service_core/Interfaces/IPersonTypesService');
let FactoryApplication = require('lib_application_core/Core/FactoryApplication');
let Enumerables = require('lib_domain_context/Enumerables');
let JsonHelper = require('lib_utilities/Utilities/JsonHelper');

const tApp = (tApp) => class extends ServiceBase { }
class _ServiceBase extends tApp(IPersonTypesService) {  }

class PersonTypesService extends _ServiceBase
{
    constructor()
    {
        super();
        this.name = "/PersonTypes";
    }

    Load(data)
    {
        data = super.Load(data);
        var enumerables = new Enumerables();
        data["Type"] = enumerables.Types.PersonTypes;
        if (!("IApplication" in data) && this.IApp == null)
            this.IApp = FactoryApplication.Get(data);
        return data;
    }

    CreateApis(app)
    {
        var service = this;
        app.post(this.name +'/Select', function (req, res) {
            var body = [];
            req.on('data', (x) => { body.push(x); }).on('end', async() => {
                var income = Buffer.concat(body).toString();
                res.json(await service.Select(JsonHelper.ConvertToObject(income)));
            });
        });
    }
}

module.exports = PersonTypesService;