module.exports = function() {
	this.Then(/^Redis should not have the session$/, function (callback) {
		var token = this.apickli.scenarioVariables.logged_session.token;
		this.redis.hgetall('session:'+token, (err, obj) => {
			if (obj)
				callback(new Error("Redis has the session even if the user had logout"))
			else
				callback();
		});
	});
};