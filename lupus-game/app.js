var express = require('express');
var path = require('path');
var logger = require('morgan');
var debug = require('debug')('lupus-game:app');
var bodyParser = require('body-parser');
var http = require('http');
var socketio = require('socket.io');
var socketioauth = require('socketio-auth');
var models = require('lupus-common').models;

// Storage
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var mongooseHistory = mongoose.createConnection('mongodb://mongo/lupus-history');
var redis = require('redis');
global.redisClient = redis.createClient({ host: 'redis' });

// Models
global.Game = models.Game(mongoose, mongooseHistory);

var app = express();
var server = http.createServer(app);
global.socket = socketio(server, { path: '/game/socket.io' });

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('lupus-common').login_middleware(redisClient));
socketioauth(global.socket, {
	authenticate: require('./middlewares/socket-auth'),
	timeout: 1000
});

// Routes
app.use('/game', require('./routes/index'));

app.http = server;
module.exports = app;
