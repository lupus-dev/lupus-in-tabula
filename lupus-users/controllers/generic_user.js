var User = require('../models/User');
var handle_error = require('lupus-common').handle_error;

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
		.catch(handle_error(res));
};