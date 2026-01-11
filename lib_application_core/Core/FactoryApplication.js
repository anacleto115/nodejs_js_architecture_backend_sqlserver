class FactoryApplication
{
    static IFactoryApplication;

    static Get(data)
    {
        if (this.IFactoryApplication == null)
            return null;

        return this.IFactoryApplication.Get(data);
    }
}

module.exports = FactoryApplication;