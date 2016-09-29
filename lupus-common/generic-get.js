var handle_error = require('./handle-error');

module.exports = function(model, ids, name, res, reducer, reducer_args) {
	model.find({ '_id': { $in: ids } })
		.exec()
		.then((collection) => {
			res.json(collection.reduce((obj, element) => {
				if (reducer)
					obj[element._id] = element[reducer].apply(element, reducer_args);
				else
					obj[element._id] = element;
				return obj;
			}, {}));
		})
		.catch(handle_error(res).get);
};
