var User = require('../models/User');
var clientIp = require('lupus-common').client_ip;
var do_save = require('lupus-common').do_save;

module.exports = function(req, res, next) {
	var body = req.body;

	var user = new User(body);
	user.created_by_ip = clientIp(req);

	do_save(user, res, 'toClient');
};