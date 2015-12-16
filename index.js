var express = require('express');
var app = express();

var mongo = require('mongodb');
var monk = require('monk');
var url = process.env.NIKHEL_MONGO_URL || 'localhost:27017/nikhel'
var db =  monk(url);
var ObjectId = mongo.ObjectID;

var bodyParser = require('body-parser');
app.use(bodyParser());

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.json({message:"Hello World"})
});

app.get('/users/', function(req, res) {
	var user = db.get("user")
	user.find({},{},function(e, docs){
		res.json(docs)
	})
});

app.post('/check/', function(req, res) {
	var user = db.get("user")
	res.send(req.body)
});

app.post('/users/', function(req, res) {
	var user = db.get("user")
	obj = req.body
	user.insert(obj,function(e, docs){
		res.json(obj)
	})
});

app.patch('/users/:userid', function(req, res) {
	var user = db.get("user")
	obj = req.body
	user.update(
		{_id:ObjectId(req.params.userid)}, obj,
		function(e, docs){
			res.json(obj)
		}
	)
});

app.get('/users/:userid', function(req, res) {
	var user = db.get("user")
	user.find({_id:ObjectId(req.params.userid)},{},function(e, docs){
		if(docs.length==1){
			res.json(docs[0])
		} else {
			res.send("Not Found")
		}
	})
});

app.delete('/users/:userid', function(req, res) {
	var user = db.get("user")
	user.remove({_id:ObjectId(req.params.userid)},{},function(e, docs){
		res.json(docs)
	})
});

app.get('/insert/', function(req, res) {
	var user = db.get("user")
	obj = {
		name:"nikhel", gender:"Male",
		date_of_birth:new Date(),
		hobbies:["cricket","movies","music"],
		comments:["cheater"]
	}
	user.insert(obj,function(e, docs){
		res.json(obj)
	})
});

app.listen(app.get('port'), function() {
console.log('Node app is running on port', app.get('port'));
});


