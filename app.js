"use strict";

var express = require("express");
var app 	= module.exports = express();
var db 		= require("./model/db");
var mongoose= require("mongoose");

var port 	= process.env.PORT || 8080;
var ip 		= process.env.IP || 'http://localhost';

var users 	= require("./routes/users");
var decks 	= require("./routes/decks");


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/hello', function(req, res) {
	res.status(200).send("Salut");
})

app.get('/hello2', function(req, res) {
	res.status(403).end();
});

app.listen(port, function() {
  console.log('Node app is running on port', port);
});

app.use('/users', users);
app.use('/decks', decks);
