module.exports = function(index, table, name, callback) {
	index = this.apickli.replaceVariables(index);

	var response = JSON.parse(this.apickli.getResponseObject().body);
	var obj = response[index];
	if (!obj)
		return callback(new Error(`The ${name} with index ${index} doesn't exist`))
	var props = table.rowsHash();

	for (let key in props) {
		var val = JSON.stringify(this.get_deep(obj, key));
		var exp = props[key];
		if (val != exp)
			return callback(new Error(`The ${name} with index ${index} has an error:
				key: ${key}
				value: ${val}
				expected: ${exp}`));
	}
	callback();
};