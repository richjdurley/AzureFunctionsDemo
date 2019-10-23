const url="";
var callOpenAPI = require("./web/callOpenAPI");

module.exports = 
{
function (context, loadRoute) {
    console.log('*** EVENT HUB TO OPENAPI FORWARDING TRIGGER ***');
    console.log('sending message to open api endpoint.' );
    console.log(loadRoute)
    callOpenAPI.httpPost(loadRoute);
    context.done();
}
}
