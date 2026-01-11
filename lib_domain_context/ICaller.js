class ICaller
{
    Execute(data) { return data; }
}

class FactoryCaller
{
    static IFactoryCaller;

    static Get(data)
    {
        if (this.IFactoryCaller == null)
            return null;

        return this.IFactoryCaller.Get(data);
    }
}

module.exports = { ICaller, FactoryCaller };