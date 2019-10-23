var daiEventUtils = require("./daiEventUtils");
var jsonUtil = require("./jsonUtil");
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
      console.log("*** Transforming Trip *** ")
      console.log(trip);
      daiEventHeader = daiEventUtils.generateDAIEventHeader(trip);
      if (trip.event.type == "com.acme.transport.shipping.api.Trip.tripFinalized") {
        daiLoadRoutePayload = this.constructDAILoadRouteJSON(trip);
        daiOrderRoutePayload = this.constructDAIOrderRouteJSON(trip);
        jsonToForward = BEGIN_BRACKET + daiEventHeader + COMMA + '"LoadRoute":' + daiLoadRoutePayload + COMMA + '"OrderRoute":' + daiOrderRoutePayload + END_BRACKET;
        console.log("*** Transformed Too LoadRoute *** ")
        console.log(jsonToForward);
        return JSON.parse(jsonToForward);
      }
    } catch (error) {
      //TODO send to bad letter queue etc
      console.error("BAD LETTER ERROR");
      console.error(JSON.stringify(error));
    }
  },

  constructDAILoadRouteJSON: function (trip) {
    console.log("Transforming To LoadRoute");
    var json;
    json = BEGIN_BRACKET;
    json += jsonUtil.jsonKeyStringValuePair('LoadRouteId', trip.vehicleTrip.tripId);
    json += COMMA;
    json += jsonUtil.jsonKeyStringValuePair('VehicleId', trip.vehicleTrip.tripId);
    json += COMMA;
    json += jsonUtil.jsonKeyStringValuePair('VehicleName', trip.vehicleTrip.friendlyTripId);
    json += COMMA;
    json += jsonUtil.jsonKeyStringValuePair('DepartureTime', trip.vehicleTrip.departureTime);
    json += COMMA;
    json += jsonUtil.jsonKeyStringValuePair('ReturnToSiteTime', trip.vehicleTrip.returnTime);
    json += COMMA;
    json += jsonUtil.jsonKeyStringValuePair('VehicleType', trip.vehicleTrip.vehicleType);
    json += END_BRACKET;
    return json;
  },

  constructDAIOrderRouteJSON: function (trip) {
    var json;
    json = BEGIN_BRACKET;
    json += jsonUtil.jsonKeyStringValuePair('OrderID', trip.vehicleTrip.stops[0].fulfilmentOrderId);
    json += COMMA;
    json += jsonUtil.jsonKeyStringValuePair('DropNumber', trip.vehicleTrip.stops[0].stopSequenceId);
    json += END_BRACKET;
    return json;
  }
};