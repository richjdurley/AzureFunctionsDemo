module.exports = function (context,trip) {
    console.log('Function triggered to process and send a trip message');
    console.log('doing transformation');
    console.log('sending message to dai');
    context.bindings.loadroute = [];
    context.bindings.loadroute.push(trip);
    context.done();
};