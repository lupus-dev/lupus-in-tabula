var handle_error = require('./handle-error');

module.exports = function(model, res, reducer, reducer_args) {
	model.save()
		.then((instance) => {
			if (reducer)
				res.status(201).json(instance[reducer].call(instance, reducer_args || []));
			else
				res.status(201).json(instance);
		})
		.catch(handle_error(res).save);
};
