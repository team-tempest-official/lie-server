"use strict";

var express = require("express");
var router = express.Router();


router.get('/get', function(req, res) {
	res.send("Got decks");
});


router.put('/update', function(req, res) {
	res.send("Updated decks");

});


router.post('/create', function(req, res) {
	res.send("Created decks");
});

router.delete('/delete', function(req, res) {
	res.send("Deleted decks");
});

module.exports = router;
