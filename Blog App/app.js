//requiring the needed pckages
var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    methodOverride = require("method_override"),
    bodyParser = require("body-parser");
//connceting to the DB
mongoose.connect("mongodb://localhost:27017/blog_app");
//setting the view engine to ejs
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
//use public for costume css files
app.use(express.static("public"));
//use method-override to be able  to handle the PUT request
//will use "_method" in the URL section of  form in the edit.ejs
app.use(methodOverride("_method"))

//Model Config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);
/*
                RESTful Routs
*/

//          Index Route
app.get("/", function(req,res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req,res){
    //Retrieving data from the DB
    Blog.find({}, function(err, blogFinds){
        if(err){
            console.log("Error!");
        }else{
            //rendering the data passed from the DB
            res.render("index", {blogs: blogFinds});
        }
    });
});

//      New Route
app.get("/blogs/new", function(req, res){
    //rendering new.ejs
    res.render("new");
})

//       Create Route
app.post("/blogs", function(req,res){
    //create a blog from what the user inputted in the form; the first arguement is the blog object
    Blog.create(req.body.blog, function(err, blogs){
        if(err){
            //rebder the new.ejs file
            res.render("new");
        }else{
            //redirect back to the blogs page
            res.redirect("/blogs");
        }
    })
})

//        Show Route
app.get("/blogs/:id", function(req,res){
    //finding the ID 
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            //redirect to the  main page if there is an error
             res.redirect("/");
        }else{
            //render the show.ejs file then pass the blog object to that files
            res.render("show", {blog: blog});
        }
    })
})

//      Edit Route
app.get("/blogs/:id/edit", function(req,res){
    //getting the ID from URL 
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            //if there is an error, redirect to the first page
            res.redirect("/blogs");
        }else{
            //passing the found Blog(from the ID) to the edit.ejs file
            res.render("edit", {blog: foundBlog})
        }
    });
});

//      Update Route
//since PUT is not supported by HTML, "?_mehtod=PUT" has been added in the URL part of the from in edit.ejs file: method_override
app.put("/blogs/:id",function(req, res){
    //find the existing blof and update with the new data passing (id, new Date, callback)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updateBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/" +req.params.id);
        }
    });
});

//     Delete Route
app.delete("/blogs/:id", function(req,res){
    //find the desired blog and remove; the method_override has been added in the show.ejs file
    //by submitting the button there. this would be triggered
    Blog.findByIdAndRemove(req.params.id,function(err){
       if(err){
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs");
       }
   })
    })
})



app.listen(process.env.PORT, process.env.IP);
