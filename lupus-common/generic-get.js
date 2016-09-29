var handle_error = require('./handle-error');

module.exports = function(model, ids, name, res, reducer) {
	model.find({ '_id': { $in: ids } })
		.exec()
		.then((collection) => {
			res.json(collection.reduce((obj, element) => {
				if (reducer)
					obj[element._id] = element[reducer]();
				else
					obj[element._id] = element;
				return obj;
			}, {}));
		})
		.catch(handle_error(res).get);
};
