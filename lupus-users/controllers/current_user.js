var mongoose = require('mongoose');
var User = require('../models/User');
var check_login = require('lupus-common').check_login;

module.exports = function(req, res, next) {
	if (!check_login(req, res)) return;

	User.findOne({ '_id': req.session.user_id })
		.exec()
		.then((user) => {
			if (!user)
				res.status(404).json({ error: 'Your user has been deleted!!' });
			else
				res.json(user.toClient());
		})
		.catch((error) => {
			res.status(400).json(error);
		});
};