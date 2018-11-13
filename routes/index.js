var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
   res.send('index.html'); 
});

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jokesDB');

var jokesSchema = mongoose.Schema({
    Joke: String
});

var Joke = mongoose.model('Joke', jokesSchema);
var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('Connected to MongoDB');
});

router.post('/jokes', function(req, res, next) {
    console.log("POSTING A JOKE");
    console.log(req.body);
});

router.get('/jokes', function(req, res, next) {
    Joke.find(function(err, jokeList) {
      if (err) return console.error(err);
      else {
        res.json(jokeList); 
      }
    });
});

module.exports = router;
