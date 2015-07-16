"use strict";

var express 	= require("express");
var mongoose	= require("mongoose");
var router 		= express.Router();

var Users = mongoose.model('Users');

router.get("/", function(req, res) {
	Users.find().exec(function(err, all) {
		if (err) {
			console.log("Error: " + err);
			res.status(500).end();
		}

		res.send(all);
	})
});



router.put('/update', function(req, res) {
	res.send("Updated users");
});


function validateEmail(email) {
	if (email == undefined) {
		return false;
	}

	if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
		return false;
	}

	return true;
}

router.post('/create', function(req, res) {


	var email 	= req.body.email;
	var name 	= req.body.name;

	/* null or undefined */
	if (!validateEmail(email) || name == undefined || name == '') {
		console.log("Bad request for creation");
		res.status(400).end();
	}

	new Users({
		"user_email": 	email,
		"user_name": 	name,
		"user_decks":   []
	}).save(function(error, todo, count) {
		if (error) {
			console.log("Error: " + error);
			res.status(500).end();
		} else {
			console.log("* Created user: " + name + " with email: " + email);
			res.status(200).end();
		}

	});
});

router.delete('/delete', function(req, res) {
	res.send("Deleted users");
});

module.exports = router;
