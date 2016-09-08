var redisClient = global.redisClient;
var sessions = require('lupus-common').sessions(redisClient);
var check_login = require('lupus-common').check_login;

module.exports = function(req, res, next) {
	if (!check_login(req, res)) return;

	sessions.removeSession(req.session);
	res.status(200).json({ message: "Logged out" });
};