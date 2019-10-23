module.exports = {
  generateDAIEventHeader: function (tescoEvent) {
    console.log("Received an Event with Header");
    console.log(tescoEvent.event.timestamp);
    console.log(tescoEvent.event.id);
    console.log(tescoEvent.event.type);
    console.log(tescoEvent.event.traceId);
    json = '"Header": {"Timestamp":"' + tescoEvent.event.timestamp + '"}'
    return json;
  }
}