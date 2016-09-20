var mongoose = require('mongoose');
var models = require('lupus-common').models;
var redis = require('redis');
var redisClient = redis.createClient({ host: 'redis' });

mongoose.Promise = global.Promise;
var mongooseUsers = mongoose.createConnection('mongodb://mongo/lupus-users');
var mongooseHistory = mongoose.createConnection('mongodb://mongo/lupus-history');

var User = models.User(mongoose, mongooseUsers);
var Game = models.Game(mongoose, mongooseHistory);

global.mongooseConnections = [mongooseUsers, mongooseHistory];

module.exports = function($this) {
	$this.redis = redisClient;

	$this.User = User;
	$this.Game = Game;

	require('fs').readdirSync(__dirname + '/support/').forEach(function(file) {
		if (file.match(/\.js$/) !== null) {
			var name = file.replace('.js', '');
			$this[name] = require('./support/' + name).bind($this);
		}
	});
};
