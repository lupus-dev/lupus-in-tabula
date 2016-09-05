var mongoose = require('mongoose');
var redis = require('redis');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo/lupus-history');

var redisClient = redis.createClient({ host: 'redis' });

var World = function() {
	this.redis = redisClient;
};

module.exports = function() {
	this.World = World;
};