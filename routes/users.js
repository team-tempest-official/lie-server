"use strict";

var express 	= require("express");
var mongoose	= require("mongoose");
var router 		= express.Router();

var Users = mongoose.model('Users');


router.get("/get", function(req, res) {
	Users.find().exec(function(err, all) {
		if (err) {
			console.log("Error: " + err);
			res.status(500).end();
		}

		res.send(all);
	})
});



router.post('/update', function(req, res) {
	var email 	= req.body.email;
	var name 	= req.body.name;

	/* add decks update*/

	Users.findOne({ user_email : email }, function(err, user) {
		if (err) {
			console.log("User: " + email + " not found!");
			res.status(404).send();
		} else {
			if (email !== undefiend && email != null && validateEmail(email)) {
				user.email = email;
			}

			if (name !== undefined && name !== null) {
				user.name = name;
			}

			user.save(function (err) {
				if (err) {
					console.log("* Error changing email for user: " + email);
					res.status(400).end();
				} else {
					console.log("* Changed email for user: " + email);
					res.status(200).end();
				}
			})
		}

	});

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
		user_email: email,
		user_name: 	name,
		user_decks:   []
	}).save(function(error, todo, count) {
		console.log(error)
		if (error != undefined) {
			console.log(error)
			if (error.code == 11000) {
				res.status(400).send('{"message" : "User already exists"}');
			}

			console.log("Error: " + error);
			res.status(500).end();
		} else {
			console.log("* Created user: " + name + " with email: " + email);
			res.status(200).end();
		}

	});
});


router.post('/delete', function(req, res) {
	var email 	= req.body.email;

	/* null or undefined */
	if (!validateEmail(email) || email == undefined || email == '') {
		console.log("Bad request for deletion");
		res.status(400).end();
	}

	Users.remove({ user_email : email }, function(err) {
		if (!err) {
			console.log("* Deleted user with email: " + email);
			res.status(200).end();
		} else {
			console.log("* Error deleting  user with email: " + email);
			res.status(400).end();
		}

	});


});


module.exports = router;
