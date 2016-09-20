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
				$this.apickli.storeValueInScenarioScope('logged_token', res.session.token);
				$this.apickli.storeValueInScenarioScope('logged_session', res.session);
				$this.apickli.storeValueInScenarioScope('logged_user', res.user);

				callback();
			});
		});
	});
};
