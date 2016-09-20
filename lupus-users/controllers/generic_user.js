var User = global.User;
var generic_get = require('lupus-common').generic_get;

module.exports = function(req, res, next) {
	var user_ids = req.params.user_ids.split(',');

	generic_get(User, user_ids, 'users', res, 'toClientShort');
};
