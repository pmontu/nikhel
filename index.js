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

app.listen(app.get('port'), function() {
console.log('Node app is running on port', app.get('port'));
});


