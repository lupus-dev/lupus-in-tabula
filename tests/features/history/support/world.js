var redis = require('redis');
var redisClient = redis.createClient({ host: 'redis' });

var World = function() {
	this.redis = redisClient;

	require('../../common/world')(this);
};

module.exports = function() {
	this.World = World;
};