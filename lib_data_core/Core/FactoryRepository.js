class FactoryRepository
{
    static IFactoryRepository;

    static Get(data)
    {
        if (this.IFactoryRepository == null)
            return null;

        return this.IFactoryRepository.Get(data);
    }
}

module.exports = FactoryRepository;