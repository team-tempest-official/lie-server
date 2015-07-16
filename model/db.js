"use strict";

var mongoose    = require("mongoose");
var Schema      = mongoose.Schema;

var Cards = new Schema({
    card_q:           String,
    card_a:           String
});


var Decks = new Schema({
    deck_name:        String,
    deck_tags:        [String],
    deck_cards:       [Cards]
});


var Users = new Schema({
    user_email:        {type : String, unique : true},
    user_name   :       String,
    user_decks:       [Decks]
});



mongoose.model('Users', Users);
mongoose.model('Decks', Decks);
mongoose.model('Cards', Cards);


mongoose.connect('mongodb://localhost/lie-server');