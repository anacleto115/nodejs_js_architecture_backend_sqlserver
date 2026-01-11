let IFactory = require('lib_domain_context/IFactory');
let Enumerables = require('lib_domain_context/Enumerables');
let PersonTypesApp = require('../Implementations/PersonTypesApp');

class FactoryApplicationContext extends IFactory
{
	Get(data)
	{
		var value = data["Type"];
		var enumerables = new Enumerables();
		switch (value)
		{
			case enumerables.Types.PersonTypes: return new PersonTypesApp(data);
			default: return new PersonsApp(data);
		}
    }
}

module.exports = FactoryApplicationContext;