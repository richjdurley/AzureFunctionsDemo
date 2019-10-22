const url="";
var callOpenAPI = require("./web/callOpenAPI");

module.exports = 
{
function (context, loadRoute) {
    console.log('IN OPENAPI FORWARDING TRIGGER : Function triggered to forward payload to REST endpoint');
    console.log('sending message to open api endpoint.');
    callOpenAPI.httpPost(loadRoute);
    context.done();
}
}
