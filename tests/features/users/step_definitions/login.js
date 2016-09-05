module.exports = function() {
	this.Then(/^Redis should have a proper session token$/, function (callback) {
		var token = this.apickli.scenarioVariables.logged_session.token;
		var user_id = this.apickli.scenarioVariables.logged_user.user_id;
		this.redis.hgetall('session:'+token, (err, obj) => {
			if (obj.user_id == user_id)
				callback();
			else
				callback(new Error('Session in redis is invalid'));
		});
	});
};