var redisClient = global.redisClient;
var sessions = require('../common/sessions.js')(redisClient);
var check_login = require('../common/check-login');

module.exports = function(req, res, next) {
	if (!check_login(req, res)) return;

	sessions.removeSession(req.session);
	res.status(200).json({ message: "Logged out" });
};