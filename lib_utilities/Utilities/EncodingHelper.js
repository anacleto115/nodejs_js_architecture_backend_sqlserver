class EncodingHelper
{
    static ToString(data)
    {
        return Buffer.from(data).toString('hex');
    }

    static ToBytes(data)
    {
        return Uint8Array.from(Buffer.from(data, 'hex'));
    }
}

module.exports = EncodingHelper;