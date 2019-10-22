var transform = require("./transformer/transform");

module.exports = 
{
function (context,trip) {
    var loadRoute;
    console.log('IN FORWARDING TRIGGER : Function triggered to process and send a loadRoute message');
    console.log('doing transformation');
    console.log('Sending message to dai event hub');
    loadRoute = JSON.stringify(transform.transform_trip_to_loadRoute(trip));
    console.log(loadRoute);
    context.bindings.loadroute = [];
    context.bindings.loadroute.push(loadRoute);
    context.done();
    

}
}
