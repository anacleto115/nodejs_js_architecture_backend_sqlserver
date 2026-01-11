let IFactory = require('lib_domain_context/IFactory');
let Enumerables = require('lib_domain_context/Enumerables');
let PersonTypesRepository = require('../Implementations/PersonTypesRepository');

class FactoryRepositoryContext extends IFactory
{
	Get(data)
	{
		var value = data["Type"];
		var enumerables = new Enumerables();
		switch (value)
		{
			case enumerables.Types.PersonTypes: return new PersonTypesRepository(data);
			default: return new PersonsRepository(data);
		}
    }
}

module.exports = FactoryRepositoryContext;