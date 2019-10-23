const QUOTES = '"';
const COMMA = ',';
const BEGIN_BRACKET = '{';
const END_BRACKET = '}';
const COLON = ":";

module.exports = {
    jsonKeyStringValuePair: function (key, value) {
        return QUOTES + key + QUOTES + COLON + QUOTES + value + QUOTES;
    }
}