//getting express package and store its functionality
var express = require("express");
var app = express();
//require body-parser
var bodyParser = require("body-parser");

//tell the app to use the body-parser
app.use(bodyParser.urlencoded({extended : true }));

//view engine being set to ejs
app.set("view engine" , "ejs");

//array of campgrounds
var campArr = [
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
]

//The landing page route
app.get("/",function(req,res){
    res.render("landingPage")
});

// the campgrounds page
app.get("/campgrounds", function(req,res){
    //rendering the campground.ejs and passing the campArr to the file
    res.render("campgrounds", {campArr: campArr});    
    
});


//post request
app.post("/campgrounds", function(req, res){
    //storing the inputted info from the form
    var name= req.body.name;
    var image= req.body.image;
    //making a new object that has the newly added info
    var newCampGround = {name: name, image: image};
    //adding the new name into the array
    campArr.push(newCampGround);
    //redirecting to /campground
    res.redirect("/campgrounds");
    
});

//
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});


//listening for the server on cloud9
app.listen(process.env.PORT, process.env.IP);
