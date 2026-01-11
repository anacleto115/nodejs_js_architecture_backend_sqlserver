class ICacheHelper
{
    Add(key, value) { }
    Instance() { }
    Contains(key) { }
    Get(key) { }
    Remove(key) { }
}

class CacheDictionary extends ICacheHelper
{
    data = null;

    Add(key, value)
    {
        this.Instance();
        this.data[key] = value;
    }

    Instance()
    {
        if (this.data != null)
            return;
        this.data = { };
    }

    Contains(key)
    {
        this.Instance();
        return key in this.data;
    }

    Get(key)
    {
        this.Instance();
        if (!this.Contains(key))
            return null;
        return this.data[key];
    }

    Remove(key)
    {
        this.Instance();
        if (!this.Contains(key))
            return null;
        delete this.data[key];
    }
}

class CacheHelper
{
    static ICacheHelper;

    static Add(key, value)
    {
        CacheHelper.CreateInstance();
        CacheHelper.ICacheHelper.Add(key, value);
    }

    static CreateInstance(iCacheHelper = null)
    {
        if (CacheHelper.ICacheHelper != null)
            return;
        if (iCacheHelper != null)
            CacheHelper.ICacheHelper = iCacheHelper;
        else if (CacheHelper.ICacheHelper == null)
            CacheHelper.ICacheHelper = new CacheDictionary();
    }

    static Contains(key)
    {
        CacheHelper.CreateInstance();
        return CacheHelper.ICacheHelper.Contains(key);
    }

    static Get(key)
    {
        CacheHelper.CreateInstance();
        return CacheHelper.ICacheHelper.Get(key);
    }

    static Remove(key)
    {
        CacheHelper.CreateInstance();
        CacheHelper.ICacheHelper.Get(key);
    }
}

module.exports = { ICacheHelper, CacheDictionary, CacheHelper };