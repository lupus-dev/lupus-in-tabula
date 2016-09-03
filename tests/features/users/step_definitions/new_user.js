var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

module.exports = function () {
	this.Given(/^There was a registered user ?(.*)$/, function (name, table, callback) {
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

		var props = table.raw();
		for (let i in props)
			user[props[i][0]] = JSON.parse(props[i][1]);

		var $this = this;

		// beacause of a bug of mongoose (?) $__save is called instead of save
		user.$__save({}, function(err, doc) {
			if (name)
				$this.apickli.storeValueInScenarioScope(name, doc._id);
			callback();
		});
	});


	this.Given(/^I set JSON body to$/, function (jsonBody, callback) {
		this.apickli.addRequestHeader('Content-Type', 'application/json');
		this.apickli.setRequestBody(jsonBody);
		callback();
	});

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
		if (bcrypt.compareSync(password, user.password_hash))
			callback();
		else
			callback(new Error('The password stored in database is invalid'));
	});
};