module.exports = function(user_info, callback) {
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