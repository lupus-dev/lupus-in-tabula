var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var User = require('../models/User');

module.exports = function(req, res, next) {
	var user_ids = req.params.user_ids.split(',');

	User.find({ '_id': { $in: user_ids } })
		.exec()
		.then((users) => {
			if (users.length == 0)
				res.status(404).json({ error: 'No users found' });
			else
				res.json(users.reduce((obj, user) => {
					obj[user._id] = user.toClientShort();
					return obj;
				}, {}));
		})
		.catch((error) => {
			if (error.name == 'CastError')
				res.status(400).json({ error: 'Invalid format of input' });
			else
				res.status(400).json(error);
		});
};