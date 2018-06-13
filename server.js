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

app.use(express.static('public'));

app.get('/', function (req, res, next) {
	res.status(200).render('mainPage', {})
});

app.get('*', function (req, res) {
	res.status(404).render('404');
});

MongoClient.connect(mongoURL, function (err, client) {
	if (err) {
		throw err;
	}
	db = mongoDBDatabase = client.db(cs290_bairdapa);
	app.listen(3000, function () {
		console.log("== Server listening on port 3000");
	});
});