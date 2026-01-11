let IToken = require('lib_service_core/Core/IToken');
let ServiceData = require('lib_domain_context/ServiceData');
let JsonHelper = require('lib_utilities/Utilities/JsonHelper');

class TokenService extends IToken
{
    CreateApis(app)
    {
        var service = this;
        app.post('/Token/Authenticate', function (req, res) {
            var body = [];
            req.on('data', (x) => { body.push(x); }).on('end', async() => {
                var income = Buffer.concat(body).toString();
                res.json(await service.Authenticate(income));
            });
        });
    }

    async Authenticate(income)
    {
        try
        {
            var data = JsonHelper.ConvertToObject(income);

            var inputDate = new Date();
            var day = inputDate.getDate().toString();
            var month = (inputDate.getMonth() + 1).toString();
            var year = inputDate.getFullYear();

            day = day.padStart(2, '0');
            month = month.padStart(2, '0');

            return "{" +
                "'Token': '" + ServiceData.KeyToken + "', " +
                "'Expires':'" + `${day}/${month}/${year}` + "'" +
                "}";
        }
        catch (ex)
        {
            return "{" +
                "'Error': '" + String(ex) + "', " +
                "}";
        }
    }

    Validate(data)
    {
        try
        {
            if (data == null || !("Bearer" in data))
                return false;
            var bearer = data["Bearer"];
            if (bearer == undefined || !ServiceData.KeyToken == bearer)
                return false;
            return true;
        }
        catch (ex)
        {
            return false;
        }
    }
}

module.exports = TokenService;