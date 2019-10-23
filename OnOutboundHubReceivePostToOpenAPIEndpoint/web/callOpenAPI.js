const http = require('http')
var id = 1000;

module.exports = {
  httpPost: function (dataJSON) {
    id++;
    console.log("DOING HTTP POST TO TEST ENDPOINT ")
    var jsonData = '{"id":' + id + ',' + '"payload":' + JSON.stringify(dataJSON) + '}';
    var options = {
      hostname: 'localhost',
      port: 3000,
      path: '/posts',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log('POSTING MESAGE ' + id + ' to Open API');
    console.log(jsonData);
    post_request = http.request(options, function (res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('Response: ' + chunk);
      })
    });
    post_request.write(jsonData);
    post_request.end();
  }
}