var transform = require("./transformer/transformTripToLoadRoute");

module.exports = {
    function (context, trip) {
        var loadRoute;
        console.log('*** IN ON OUBOUND HUB TRANSFORM AND FORWARDING TRIGGER : Function triggered to process and send a loadRoute message ***');
        console.log('Doing transformation');
        loadRoute = JSON.stringify(transform.transform_trip_to_loadRoute(trip));
        console.log(loadRoute);
        console.log('Sending message to dai event hub');
        context.bindings.loadroute = [];
        context.bindings.loadroute.push(loadRoute);
        context.done();
    }
}