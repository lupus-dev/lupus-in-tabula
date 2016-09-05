var mongoose = require('mongoose');
var redis = require('redis');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo/lupus-history');

var redisClient = redis.createClient({ host: 'redis' });

var Game = mongoose.model('Game', require('../../../../lupus-history/models/Game').schema);

var World = function() {
	this.redis = redisClient;
	this.Game = Game;
};

module.exports = function() {
	this.World = World;
};