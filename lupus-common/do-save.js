var handle_error = require('./handle-error');

module.exports = function(model, res, reducer) {
	model.save()
		.then((instance) => {
			res.status(201).json(reducer ? instance[reducer]() : instance);
		})
		.catch(handle_error(res).save);
};
