var express = require('express');
var path = require('path');
var logger = require('morgan');
var debug = require('debug')('lupus-users:app');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
	mongoose.connect('mongodb://mongo/test');
var redis = require('redis'),
	redisClient = redis.createClient({ host: 'redis' });

var index = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', index);

module.exports = app;
