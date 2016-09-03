var mongoose = require('mongoose');
var redis = require('redis');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo/lupus-users');

var redisClient = redis.createClient({ host: 'redis' });

var User = mongoose.model('User', require('../../../../lupus-users/models/User').schema);

var World = function() {
	this.redis = redisClient;
	this.User = User;

	this.save_user = function(user_info, callback) {
		var user = new this.User({
			username: 'edomora97',
			password: 'SecretPassword',
			name: 'Edoardo',
			surname: 'Morassutto',
			level: 5,
			achievements: [],
			friends: [],
			created_by_ip: '1.2.3.4'
		});

		for (let i in user_info)
			user[i] = JSON.parse(user_info[i]);

		var $this = this;

		// beacause of a bug of mongoose (?) $__save is called instead of save
		user.$__save({}, function(err, doc) {
			callback(doc);
		});
	};


	this.login_user = function(username, password, callback) {
		this.apickli.addRequestHeader('Content-Type', 'application/json');
		var credentials = { username: username, password: password };
		this.apickli.setRequestBody(JSON.stringify(credentials));

		this.apickli.post('/users/session', (err, response) => {
			callback(JSON.parse(response.body));
		});
	};
};

module.exports = function() {
	this.World = World;
};