var transform = require("./transformer/transform");

module.exports = 
{
function (context,trip) {
    console.log('IN TRIGGER : Function triggered to process and send a loadRoute message');
    console.log('doing transformation');
    console.log('sending message to dai');
    context.bindings.loadroute = [];
    context.bindings.loadroute.push(transform.transform_trip_to_loadRoute(trip));
    context.done();
}
}
