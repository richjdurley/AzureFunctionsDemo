const example_trip = JSON.parse('{ "event": { "timestamp": "2019-10-09T00:02:02Z", "id": "com.acme.transport.shipping.api.Trip.2429_091019_1_1_08_1HD08", "type": "com.acme.transport.shipping.api.Trip.tripFinalized", "traceId": "91e242c9-d7bd-4f12-b2fe-56f27a12b316" }, "vehicleTrip": { "tripId": "2429_091019_1_1_08", "friendlyTripId": "1HD08", "departureTime": "2019-02-04T08:15:00Z", "returnTime": "2019-02-04T12:45:00Z", "vehicleType": "ACME_PREMIUM_VAN", "stops": [{ "orderRef": "181458253", "fulfilmentOrderId": "181458254", "departure": "2019-10-09T08:56:30Z", "arrival": "2019-10-09T08:46:30Z", "stopSequenceId": "1" }, { "orderRef": "181458254", "fulfilmentOrderId": "181458254", "departure": "2019-10-09T09:16:30Z", "arrival": "2019-10-09T09:26:30Z", "stopSequenceId": "2" } ], "tripStatus": "FINAL", "locationId": "2429", "dateTime": "2019-10-09T08:46:30Z", "scheduleId": "schedule-2429-GB-HD-2019-10-09T080001Z-2019-10-09T124500Z-FINAL-1549517793852-5460" } }');
const example_dai_header = '"Header": {"Timestamp": "20191001T00:00:00Z","DestinationId": "UFC1","SenderId": "TESCO","UniqueKey": "abcdefghijklmnopqrstuvwxyz01234567","Version": "0.1"}';

//JSON Constants
const QUOTES = '"';
const COMMA = ',';
const BEGIN_BRACKET = '{';
const END_BRACKET = '}';
const COLON = ":";

module.exports = {

  transform_trip_to_loadRoute: function (trip) {
    var daiEventHeader;
    var daiLoadRoutePayload;
    var daiOrderRoutePayload;
    var jsonToForward;
    try {
      console.log("*** Transforming *** " ) 
      console.log(trip);
      daiEventHeader = this.constructDAIEventHeader(trip);
      if (trip.event.type == "com.acme.transport.shipping.api.Trip.tripFinalized") {
        daiLoadRoutePayload = this.constructDAILoadRouteJSON(trip);
        daiOrderRoutePayload = this.constructDAIOrderRouteJSON(trip);
        jsonToForward = BEGIN_BRACKET + daiEventHeader + COMMA + '"LoadRoute":' + daiLoadRoutePayload + COMMA +  '"OrderRoute":'+ daiOrderRoutePayload + END_BRACKET ;
        console.log("*** Transformed Too *** ")
        console.log(jsonToForward);
        return JSON.parse(jsonToForward);
      }
    } catch (error) {
      //TODO send to bad letter queue etc
      console.log("BAD LETTER ERROR");
      console.log(error);
    }
  },
  jsonKeyStringValuePair: function (key, value) {
    return QUOTES + key + QUOTES + COLON + QUOTES + value + QUOTES;
  },

  constructDAILoadRouteJSON: function (trip) {
    console.log("Transforming To LoadRoute");
    json = BEGIN_BRACKET;
    json += this.jsonKeyStringValuePair('LoadRouteId', trip.vehicleTrip.tripId);
    json += COMMA;
    json += this.jsonKeyStringValuePair('VehicleId', trip.vehicleTrip.tripId);
    json += COMMA;
    json += this.jsonKeyStringValuePair('VehicleName', trip.vehicleTrip.friendlyTripId);
    json += COMMA;
    json += this.jsonKeyStringValuePair('DepartureTime', trip.vehicleTrip.departureTime);
    json += COMMA;
    json += this.jsonKeyStringValuePair('ReturnToSiteTime', trip.vehicleTrip.returnTime);
    json += COMMA;
    json += this.jsonKeyStringValuePair('VehicleType', trip.vehicleTrip.vehicleType);
    json += END_BRACKET;
    return json;
  },

  constructDAIOrderRouteJSON: function (trip) {
    json = BEGIN_BRACKET;
    json += this.jsonKeyStringValuePair('OrderID', trip.vehicleTrip.stops[0].fulfilmentOrderId);
    json += COMMA;
    json += this.jsonKeyStringValuePair('DropNumber', trip.vehicleTrip.stops[0].stopSequenceId);
    json += END_BRACKET;
    return json;
  }
  ,

  constructDAIEventHeader: function (tescoEvent) {
    console.log("Received an Event with Header");
    console.log(tescoEvent.event.timestamp);
    console.log(tescoEvent.event.id);
    console.log(tescoEvent.event.type);
    console.log(tescoEvent.event.traceId);
    json = '"Header": {"Timestamp":"' + tescoEvent.event.timestamp+'"}' 
    return json;
  }

};