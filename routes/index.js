var express = require('express');
var router = express.Router();

var blacklist = ["Click for a random joke"];

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
    var jokeValue = req.body['json'];
    
    if(!blacklist.includes(jokeValue)) {
        var joke = new Joke({ Joke: jokeValue});
        joke.save(function (err) {
            if (err) return handleError(err);
            console.log("Saved new joke!");
        });
    }
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
