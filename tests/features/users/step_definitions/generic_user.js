module.exports = function() {
	this.Then(/^The user at index (.+) should be$/, function (index, table, callback) {
		index = this.apickli.replaceVariables(index);

		var response = JSON.parse(this.apickli.getResponseObject().body);
		var user = response[index];
		var props = table.raw();

		for (let i in props) {
			var prop = props[i];
			var key = prop[0];
			var val = JSON.parse(prop[1]);
			if (user[key] != val)
				callback(new Error(`The user with index ${index} has an error:
					key: ${key}
					value: ${JSON.stringify(user[key])}
					expected: ${prop[1]}`));
		}
		callback();
	});
};