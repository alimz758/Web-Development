//import Express from npm
var express= require("express");
var app= express();


/* Routs
Oreder of Routs matter, "* shouldn't come first"
*/

//A get requestm
// '/' : When '/' is requested
app.get("/", function(req, res){
    res.send('hell there');
});

// '/bye' is requested with a pattern recognozer using ":"
//That means the subRedditName can change based on what the the user requests
app.get("/r/:subRedditName", function(req, res){
    //Store part of the above URL ( :subReddit) 
    var subReddit = req.params.subRedditName;
   res.send("This page is about "+  subReddit); 
});


//if anything requested besides the above. it should at the bottom like "else" statement
app.get("*", function(req, res){
    res.send("You Entered a Wrong URL");
})

//Tell Express to listen for a request
//The argument is a variable that being used on cloud9
app.listen(process.env.PORT, process.env.IP);
