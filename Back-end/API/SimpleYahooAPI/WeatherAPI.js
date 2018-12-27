//requiring the request package
var request = require("request");

request("https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(error, response, body){
    //if there is no error
    if(!error && response.statusCode==200)
    {
        //since the API(body) is a string, using parse would make it an object
        var parsedDATA = JSON.parse(body);
        //show the sunset time in Hawaii
        console.log(parsedDATA["query"]["results"]["channel"]["astronomy"]["sunset"]);
    }
});
