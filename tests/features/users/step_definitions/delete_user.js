module.exports = function() {
	this.Given(/^The user (.+) was removed$/, function (user_id, callback) {
		user_id = this.apickli.replaceVariables(user_id);

		this.User.remove({ _id: user_id })
			.then((res) => {
				if (res.result.n != 1)
					callback(new Error('User with id=' + user_id + ' not found'))
				else
					callback();
			})
			.catch((err) => callback(new Error(err)));
	});
};
