var handle_error = require('./handle-error');

module.exports = function(model, ids, name, res, reducer) {
	model.find({ '_id': { $in: ids } })
		.exec()
		.then((collection) => {
			if (collection.length === 0)
				res.status(404).json({ error: `No ${name} found` });
			else
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