module.exports = function(obj, props, name, callback) {
	for (let key in props) {
		key = this.apickli.replaceVariables(key);
		var val = JSON.stringify(this.get_deep(obj, key));
		var exp = this.apickli.replaceVariables(props[key]);
		if (val != exp)
			return callback(new Error(`The ${name} has an error:
				key: ${key}
				value: ${val}
				expected: ${exp}`));
	}
	callback();
};
