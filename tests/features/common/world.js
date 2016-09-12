var mongoose = require('mongoose');
var redis = require('redis');
var redisClient = redis.createClient({ host: 'redis' });

mongoose.Promise = global.Promise;
var mongooseUsers = mongoose.createConnection('mongodb://mongo/lupus-users');
var mongooseHistory = mongoose.createConnection('mongodb://mongo/lupus-history');

var User = mongooseUsers.model('User', require('../../../lupus-users/models/User').schema);
var Game = mongooseHistory.model('Game', require('../../../lupus-history/models/Game').schema);

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