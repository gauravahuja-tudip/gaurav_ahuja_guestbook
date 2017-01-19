var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
//var passport	= require('passport');
var config      = require('./src/config/database'); // get db config file
//var User        = require('src/models/user.schema'); // get the mongoose model
var port        = process.env.PORT || 4200;
var jwt         = require('jwt-simple');
const path = require('path');
const http = require('http');

// get an instance of router
var router = express.Router();

// bundle our routes
var apiRoute = require('./src/routes/api.routing');

mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(morgan('dev'));
// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Catch all other routes and return the index file
app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, 'dist/index.html'));
})

// Start the server
app.listen(port);
console.log('There will be dragons: http://localhost:' + port);
router.get('/api', function (req, res) {
  res.json({message: 'API works'});

});

app.use('/api/auth', apiRoute);
app.use('/api/addVisitor', apiRoute);
app.use('/api/viewVisitor', apiRoute);
app.use('/api', router);
