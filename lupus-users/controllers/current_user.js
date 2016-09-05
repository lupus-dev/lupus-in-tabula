var mongoose = require('mongoose');
var User = require('../models/User');

module.exports = function(req, res, next) {
	if (!req.session)
		return res.status(401).json({ error: "You have to provide a correct token to do this" });

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