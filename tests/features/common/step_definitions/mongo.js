var mongoose = require('mongoose');

module.exports = function () {
	this.Then(/^The (.+) with id (.+) should be$/, function (model, id, table, callback) {
		if (!this[model]) return callback(new Error('Model ' + model + ' not found'));

		let model_id = this.apickli.replaceVariables(id);
		this[model].findOne({ _id: model_id })
			.then(res => {
				if (!res) return callback(new Error(model + ' with id ' + model_id + ' not found'));

				this.check_props(res, table.rowsHash(), model, callback);
			})
			.catch(error => callback(new Error(error)));
	});
};
