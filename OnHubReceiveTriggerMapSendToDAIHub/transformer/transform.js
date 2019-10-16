const example_trip =  JSON.parse('{ "event": { "timestamp": "2019-10-09T00:02:02Z", "id": "com.acme.transport.shipping.api.Trip.2429_091019_1_1_08_1HD08", "type": "com.acme.transport.shipping.api.Trip.tripFinalized", "traceId": "91e242c9-d7bd-4f12-b2fe-56f27a12b316" }, "vehicleTrip": { "tripId": "2429_091019_1_1_08", "friendlyTripId": "1HD08", "departureTime": "2019-02-04T08:15:00Z", "returnTime": "2019-02-04T12:45:00Z", "vehicleType": "ACME_PREMIUM_VAN", "stops": [{ "orderRef": "181458253", "fulfilmentOrderId": "181458254", "departure": "2019-10-09T08:56:30Z", "arrival": "2019-10-09T08:46:30Z", "stopSequenceId": "1" }, { "orderRef": "181458254", "fulfilmentOrderId": "181458254", "departure": "2019-10-09T09:16:30Z", "arrival": "2019-10-09T09:26:30Z", "stopSequenceId": "2" } ], "tripStatus": "FINAL", "locationId": "2429", "dateTime": "2019-10-09T08:46:30Z", "scheduleId": "schedule-2429-GB-HD-2019-10-09T080001Z-2019-10-09T124500Z-FINAL-1549517793852-5460" } }');
const QUOTES='"';
const COMMA=',';
const BEGIN_BRACKET='{';
const END_BRACKET='}';
const COLON=":";

module.exports = {

    transform_trip_to_loadRoute: function (trip) {
        var json;
        console.log("IN TRANSFORMER");  
        console.log("Received an Event Header");  
        console.log(trip.event.timestamp);
        console.log(trip.event.id);
        console.log(trip.event.type);
        console.log(trip.event.traceId);
        if (trip.event.type=="com.acme.transport.shipping.api.Trip.tripFinalized") {
          console.log("Constructing loadRoute");
          json=BEGIN_BRACKET;
          json+= this.jsonKeyStringValuePair('LoadRouteId',trip.vehicleTrip.tripId);
          json+=COMMA;
          json+= this.jsonKeyStringValuePair('VehicleId', trip.vehicleTrip.tripId);
          json+=END_BRACKET;
          console.log("Transformed to:" + JSON.stringify(json));
          return JSON.parse(json);
        }
        
    },
    
    jsonKeyStringValuePair: function (key, value) {
      return QUOTES + key + QUOTES + COLON + QUOTES + value + QUOTES;
    }
};