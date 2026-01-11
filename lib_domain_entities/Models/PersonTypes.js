let IEntities = require('lib_domain_context/IEntities');

class PersonTypes extends IEntities
{
    Id;
    Name;

    constructor() { super(); }

    SetId(v) { this.Id = v; }
    GetId() { return this.Id; }

    SetName(v) { this.Name = v; }
    GetName() { return this.Name; }
    
    Get_Id() { return this.Id; }
    GetClone()
    {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
}

module.exports = PersonTypes;