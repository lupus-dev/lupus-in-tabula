var _ = require('underscore');
var User = require('../models/User');
var clientIp = require('lupus-common').client_ip;

module.exports = function(req, res, next) {
	var body = req.body;

	var user = new User(body);

	user.created_by_ip = clientIp(req);

	user.save()
		.then((user) => {
			res.status(201).json(user.toClient());
		})
		.catch((err) => {
			var errors = _.map(_.values(err.errors), (val) => {
				return val.message;
			});
			res.status(400).json({ error: errors.join('; ') });
		});
};