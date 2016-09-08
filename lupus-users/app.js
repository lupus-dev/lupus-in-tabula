var express = require('express');
var path = require('path');
var logger = require('morgan');
var debug = require('debug')('lupus-users:app');
var bodyParser = require('body-parser');

// Storage
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo/lupus-users');
var redis = require('redis');
global.redisClient = redis.createClient({ host: 'redis' });

// Models
var Achievement = require('./models/Achievement');
var User = require('./models/User');

var app = express();

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('lupus-common').login_middleware(redisClient));

// Routes
app.use('/users', require('./routes/index'));

module.exports = app;
