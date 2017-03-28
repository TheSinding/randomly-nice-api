// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var hbs        = require('express-hbs');
var bodyParser = require('body-parser');
var path = require('path');


var { sentences } = require('./json/sentences.json');
var { positiveWords } = require('./json/positiveWords.json');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'hbs');
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials',
  layoutsDir: __dirname + '/views/layouts'
}));

app.use(express.static(__dirname + '/assets')); // Being able to import from assets in html

app.set('views', path.join(__dirname,'/views'));


var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/name/:name', function(req, res) {
  var random = Math.floor(Math.random() * positiveWords.length);
    res.json(
      { message: req.params.name + ' are ' + positiveWords[random]
        , topic: 'name'
      }
);
});

router.get('/sentences', function(req, res) {
  var random = Math.floor(Math.random() * sentences.length);
    res.json(
      {
        message: sentences[random]
        , topic: 'sentences'
      });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use('/', function(req, res){
  var random = Math.floor(Math.random() * sentences.length);
  res.render('index', {
    sentence: sentences[random],
  });
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
