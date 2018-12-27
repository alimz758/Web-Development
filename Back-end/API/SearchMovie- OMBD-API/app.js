//requiring express package
var express= require("express");
var app = express();
//requiring request
var request= require("request");
//setting the view engine to ejs
app.set("view engine", "ejs");

//get request for searching
app.get("/", function(req, res){
    res.render("search");
});

//get request for the /result search
app.get("/results", function(req, res){
    //requesting the query string from the form in search.ejs
    var movieSearched = req.query.movieSearch
    //stroing the url
    var url = "http://www.omdbapi.com/?s=" + movieSearched + "&apikey=thewdb"
    //requesting the API with "movieSearched" name that the user has entered 
    request(url, function(error, response, body){
        //if there is no error
        if(!error && response.statusCode == 200){
            //make the body an object
            var movieData = JSON.parse(body)
            //render the results.ejs file
            res.render("results", { movieData : movieData});
        }
    });
});

//listening to server; Cloud9 random PORT and IP
app.listen(process.env.PORT, process.env.IP);
