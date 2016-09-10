module.exports = function(res) {
	return function(error) {
		if (error.name == 'CastError')
			res.status(400).json({ error: 'Invalid format of input' });
		else
			res.status(400).json(error);
	};
};