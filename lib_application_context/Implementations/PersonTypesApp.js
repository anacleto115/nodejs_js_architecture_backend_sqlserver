let App = require('../Core/App')
let IPersonTypesApp = require('lib_application_core/Interfaces/IPersonTypesApp');
let FactoryRepository = require('lib_data_core/Core/FactoryRepository');
let PersonTypesParser = require('lib_infrastructure/Implementations/PersonTypesParser');
let Enumerables = require('lib_domain_context/Enumerables');

const tApp = (tApp) => class extends App { }
class _App extends tApp(IPersonTypesApp) { }

class PersonTypesApp extends _App
{
    constructor(data)
    {
        super();
    }

    Load(data)
    {
        data = super.Load(data);
        var enumerables = new Enumerables();
        if ("Architecture" in data &&
            data["Architecture"] == enumerables.Architecture.Services)
            this.parser = new PersonTypesParser();
        if (!("IRepository" in data))
            this.IRepository = FactoryRepository.Get(data);
        return data;
    }
}

module.exports = PersonTypesApp;