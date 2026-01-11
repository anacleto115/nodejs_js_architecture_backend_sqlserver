let JLinqList = require("./JLinqList");

class JLinq
{
    static From(list) { return new JLinqList(list); }
}

module.exports = JLinq;