class IMessage
{
    Show(message, type = 0) { }
}

class MessagesHelper
{
    static IMessage;

    static Set(iMessage) { this.IMessage = iMessage; }

    static Show(message, type = 0)
    {
        if (MessagesHelper.IMessage == null)
            return false;
        return MessagesHelper.IMessage.Show(message, type);
    }
}

module.exports = { IMessage, MessagesHelper };