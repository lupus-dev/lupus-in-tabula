var express = require('express');
var path = require('path');
var logger = require('morgan');
var debug = require('debug')('lupus-history:app');
var bodyParser = require('body-parser');

// Storage
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo/lupus-history');
var redis = require('redis');
global.redisClient = redis.createClient({ host: 'redis' });

// Models
var Game = require('./models/Game');

var app = express();

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('lupus-common').login_middleware(redisClient));

// Routes
app.use('/history', require('./routes/index'));

module.exports = app;
