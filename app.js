var http= require("http");
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var path = require("path");

//creating an express app 
app = express();

//set view directory and engine
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

var entries = [];

//make the entries array available in every view
app.locals.entries = entries;

//for logging every request
app.use(morgan("dev"));

//this populates a variable in the request [request.body] if the user is submitting a form.
app.use(bodyParser({extended:false}))

//For rendering the index.html from the index.ejs on request to root url
app.get("/", function(req, res){
	res.render("index");
});

//Render new-entry.ejs
app.get("/new-entry",function(req, res){
	res.render("new-entry");
});

app.post("/new-entry", function(req,res){
	if(!req.body.title || !req.body.body){
		res.status(400).send("Error: You should post a title and body for the entry");
	}else{
		var entry = {
			title: req.body.title,
			body: req.body.body,
			pubDate: new Date()
		};
		entries.push(entry);
		//redirect to homepage on successfull entry
		res.redirect ("/");
	}
});

//if request trickled down till here then it is an unhandled path 

app.use (function(req,res){
	res.res.status(404).render("404");
});

//creating and running the server

http.createServer(app).listen(process.env.PORT, function() {
	console.log("Guestbook started at port 3000");
});




