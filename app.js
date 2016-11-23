// =================================================================
// SHOUME ==========================================================
// =================================================================
'use strict';
var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var config		= require('./config');
var routes		= require('./app/routes');

// =================================================================
// configuration ===================================================
// =================================================================

mongoose.connect(config.db.url, function(err) {
	if(!err)
		return console.log("Connected to MongoDB !");
    console.log("Unable to connect MongoDB.");
    process.exit();
});

app.set('superSecret', config.db.secret);

app.use("/static", express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));// Debug mode

app.get('/', function(req, res) {
	res.send('HOME Api is at /api !');
});

app.use('/api', routes);
app.listen(config.port);

console.log('Magic happens at ' + config.url + "/api");
