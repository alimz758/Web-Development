var express = require("express");
var app = express();
//extracts data for the server
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Array of friends
var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

//get request for the home page
app.get("/", function(req, res){
   res.render("home"); 
});

//post request to add a new friend to the list
app.post("/addfriend", function(req, res){
    //extract the name from req and body parser package and then store it
    var newFriend = req.body.newfriend;
    //add the stored name at then end of the array
    friends.push(newFriend);
    //redirect to same page with the new info
    res.redirect("/friends");
});

//get request for the friends list
app.get("/friends", function(req, res){
    res.render("friends", {friends: friends});
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server started!!!"); 
});
