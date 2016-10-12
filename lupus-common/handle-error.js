var _ = require('underscore');

module.exports = function(res) {
	return {
		get: function(error) {
			if (error.name === 'CastError')
				res.status(400).json({ error: 'Invalid format of input' });
			else {
				console.error(error);
				res.status(400).json(error);
			}
		},
		save: function(error) {
			var errors = _.map(_.values(error.errors), (val) => {
				return val.message;
			});
			res.status(400).json({ error: errors.join('; ') });
		}
	};
};
