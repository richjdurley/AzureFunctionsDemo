const http = require('http')
var id = 2;



module.exports = {
    httpPost : function (dataJSON) {

        id++;
        var jsonData = '{"id":' + id + ',' + '"payload":' + JSON.stringify(dataJSON) + '}';
        var options = {
          hostname: 'localhost',
          port: 3000,
          path: '/posts',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'},
          json : JSON.parse(jsonData)
        };

        console.log('POSTING MESAGE ' + id + ' to Open API');
        console.log(json);
        http.request(options, res=>request(options, function (error, response, body) {
            if (error) {
              console.error(error)
              return
            }
            console.log(`statusCode: ${res.statusCode}`)
            console.log(body)
          }))
    }
}