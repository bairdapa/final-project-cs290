/*
 * Write your routing code in this file.	Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Alexander Baird-Appleton
 * Email: bairdapa@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

var mongoHost = "classmongo.engr.oregonstate.edu";
var mongoPort = 27017;
var mongoUser = "cs290_bairdapa";
var mongoPassword = "cs290_bairdapa";
var mongoDBName = "cs290_bairdapa";

var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword + '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;

var mongoDBDatabase;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (req, res, next) {
	var posts = db.collection('posts');
	var postPointer = posts.find({});
	
	postPointer.toArray(function (err, postDocs) {
		if (err) {
			res.status(500).render(500);
		} else {
			res.status(200).render('mainPage', {
				postData: postDocs
			});
		}
	});
});

app.get('*', function (req, res) {
	res.status(404).render('404');
});

app.post('/', function(req, res, next) {
	url = req.body.url;
	caption = req.body.postCaption;
	var post = {
		"url": url,
		"postCaption": caption
	};
	db.collection('posts').insertOne(post, function(err, result) {
		if (err) {
			res.status(500).render(500);
		} else {
			res.status(200);
		}
	});
});

MongoClient.connect(mongoURL, function (err, client) {
	if (err) {
		throw err;
	}
	db = mongoDBDatabase = client.db(mongoDBName);
	app.listen(3000, function () {
		console.log("== Server listening on port 3000");
	});
});