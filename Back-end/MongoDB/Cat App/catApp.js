//requiring mongoose package
var mongoose = require ("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app");

//schema: it is a predictable structure for JS code
var catSchema = new mongoose.Schema({
    name : String,
    age: Number,
    
});

//get the catSchema and compile it into a model, so we can use Cat later as an object
var Cat = mongoose.model("Cat", catSchema);

//create: create and save at the same time
Cat.create({
   name: "Snow White",
   age: 15,
   temperament: "Bland"
}, function(err, cat){
    if(err){
        console.log(err);
    } else {
        console.log(cat);
    }
});

//find: passing an empty object(looking for all of them)
//call-back function is to make sure we get a result
Cat.find({}, function(err, cats){
    if(err){
        console.log("Error!");
        console.log(err);
    }
    else{
        console.log("Here are the cats:");
        console.log(cats);
    }
});
