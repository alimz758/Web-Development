//getting express npm
var express = require("express");
var app = express();

//setting all formats to .ejs
app.set("view engine", "ejs")
//tells express to serve the content of public directory
app.use(express.static("public"));

//get request 
app.get("/fallinlovewith/:thing", function(req, res){
  var thing = req.params.thing;
  //render on html file
   res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res){
    var posts = [
        {title: "Post 1", author: "Susy"},
        {title: "My adorable pet bunny", author: "Charlie"},
        {title: "Can you believe this pomsky?", author: "Colt"}
    ];
    
    res.render("posts", {posts: posts});
})

//listen for app
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server is listening!!!"); 
});