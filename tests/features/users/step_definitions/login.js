module.exports = function() {
	this.Given(/^I am logged as$/, function (table, callback) {
		var user_info = table.rowsHash();
		if (!user_info.username) user_info.username = '"edomora97"';
		if (!user_info.password) user_info.password = '"SecretPassword"';

		var $this = this;
		this.save_user(user_info, (user) => {
			$this.apickli.storeValueInScenarioScope('logged_user_id', user._id);

			var username = JSON.parse(user_info.username);
			var password = JSON.parse(user_info.password);
			$this.login_user(username, password, (res) => {
				$this.apickli.storeValueInScenarioScope('logged_session', res.session);
				$this.apickli.storeValueInScenarioScope('logged_user', res.user);

				callback();
			});
		});
	});

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