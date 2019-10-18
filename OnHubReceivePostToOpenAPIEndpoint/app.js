var transform = require("./ajaxsender/send");
const url="";

module.exports = 
{
function (context, payload) {
    console.log('IN TRIGGER : Function triggered to forward payload to REST endpoint');
    console.log('sending message to open api endpoint....');
    context.bindings.loadroute = [];
    context.bindings.loadroute.push(transform.transform_trip_to_loadRoute(trip));
    context.done();
},
ajaxPost : function (dataJSON) {
    console.log(dataJSON);
    $.ajax({
         type: "POST",
        url: "/fake",
        data: dataJSON, 
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            timer_hide();
            alert('success: ' + data.message + '.graphml');
        },
        failure: function(errMsg) {
            timer_hide();
            alert('failed: ' + JSON.stringify(errMsg));
        }
});
}
}
