let IConfiguration = require('lib_domain_context/IConfiguration')

class Configuration extends IConfiguration
{
    Get(key)
    {
        return {
            user: 'sa',
            password: '*****',
            server: '192.168.0.35',
            database: 'db_persons',
            options: { encrypt: true, trustServerCertificate: true }
        };
    }
}

module.exports = Configuration;