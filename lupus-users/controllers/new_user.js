var _ = require('underscore');
var passwordHash = require('password-hash');
var User = require('../models/User');
var clientIp = require('../utils/client-ip');

module.exports = function(req, res, next) {
	var body = req.body;

	var user = new User(body);

	user.password_hash = passwordHash.generate(body.password);
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