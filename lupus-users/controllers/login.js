var User = require('../models/User');
var redisClient = global.redisClient;
var sessions = require('lupus-common').sessions(redisClient);

module.exports = function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	User.findOne({ 'username': username })
		.exec()
		.then((user) => {
			if (!user || !user.isValidPassword(password))
				res.status(401).json({ error: 'Wrong username or password' });
			else {
				var session = sessions.genSession(user);
				res.status(201).json({
					session: session,
					user: user.toClient()
				});
			}
		})
		.catch((error) => {
			console.log('Error', error);
			res.status(400).json(error);
		});
};