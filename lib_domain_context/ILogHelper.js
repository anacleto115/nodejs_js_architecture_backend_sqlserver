class ILogHelper
{
    Log(exception) { }
}

class LogHelper
{
    static ILogHelper;

    static Set(iLogHelper) { this.ILogHelper = iLogHelper; }

    static Log(exception)
    {
        if (LogHelper.ILogHelper == null)
            return;
        LogHelper.ILogHelper.Log(exception);
    }
}

module.exports = { ILogHelper, LogHelper };