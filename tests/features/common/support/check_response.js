module.exports = function(index, table, name, callback) {
	index = this.apickli.replaceVariables(index);

	var response = JSON.parse(this.apickli.getResponseObject().body);
	var obj = response[index];
	if (!obj)
		return callback(new Error(`The ${name} with index ${index} doesn't exist`))
	var props = table.rowsHash();

	this.check_props(obj, props, name, callback);
};