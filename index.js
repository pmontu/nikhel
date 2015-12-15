var express = require('express');
var app = express();

var mongo = require('mongodb');
var monk = require('monk');
var db =  monk('localhost:27017/nikhel');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.json({message:"Hello World"})
});

app.get('/users/', function(req, res) {
	var user = db.get("user")
	user.find({},{},function(e, docs){
		res.send(docs)
	})
});

app.get('/users/insert', function(req, res) {
	var user = db.get("user")
	obj = {
		name:"nikhel", gender:"Male",
		date_of_birth:new Date(),
		hobbies:["cricket","movies","music"],
		comments:["cheater"]
	}
	user.insert(obj,function(e, docs){
		res.send(obj)
	})
});

app.listen(app.get('port'), function() {
console.log('Node app is running on port', app.get('port'));
});


