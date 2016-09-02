var express = require('express');
var path = require('path');
var logger = require('morgan');
var debug = require('debug')('lupus-users:app');
var bodyParser = require('body-parser');

// Storage
var mongoose = require('mongoose');
	mongoose.connect('mongodb://mongo/lupus-users');
var redis = require('redis'),
	redisClient = redis.createClient({ host: 'redis' });

// Models
var Achievement = require('./models/Achievement');
var User = require('./models/User');

var app = express();

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/users', require('./routes/index'));

module.exports = app;