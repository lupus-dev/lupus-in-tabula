var User = require('../models/User');
var clientIp = require('lupus-common').client_ip;
var handle_error = require('lupus-common').handle_error;

module.exports = function(req, res, next) {
	var body = req.body;

	var user = new User(body);

	user.created_by_ip = clientIp(req);

	user.save()
		.then((user) => {
			res.status(201).json(user.toClient());
		})
		.catch(handle_error(res).save);
};