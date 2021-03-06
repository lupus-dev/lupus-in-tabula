var mongoose = require('mongoose');

module.exports = function () {
	this.Then(/^The new user should be created$/, function (callback) {
		var user_id = this.apickli.scenarioVariables.user_id;

		if (!user_id) return callback(new Error('The server didn\'t send the user_id'));

		this.User.findOne({ _id: user_id })
			.exec()
			.then((user) => {
				if (user == null)
					callback(new Error('The user was not created'))
				else {
					this.apickli.storeValueInScenarioScope('new_user', user);
					callback();
				}
			})
			.catch((error) => {
				callback(new Error(error));
			});
	});

	this.Then(/^The new user should be$/, function (table, callback) {
		var user_id = this.apickli.scenarioVariables.user_id;
		var user = this.apickli.scenarioVariables.new_user;

		if (user_id != user._id)
			callback(new Error(`user_id of new user is different: original:${user_id} db:${user._id}`));

		var props = table.raw();
		for (let i in props) {
			var prop = props[i];
			var key = prop[0];
			var value = JSON.parse(prop[1]);
			if (JSON.stringify(user[key]) != JSON.stringify(value))
				callback(new Error(`Expecting prop ${key} to be ${prop[1]} instead of ${JSON.stringify(user[key])}`))
		}

		callback();
	});

	this.Then(/^The user's password should be (.+)$/, function (password, callback) {
		var user = this.apickli.scenarioVariables.new_user;
		if (user.isValidPassword(password))
			callback();
		else
			callback(new Error('The password stored in database is invalid'));
	});
};
