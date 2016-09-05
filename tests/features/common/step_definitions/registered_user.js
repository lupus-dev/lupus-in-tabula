module.exports = function() {
	this.Given(/^There was a registered user ?(.*)$/, function (name, table, callback) {
		var $this = this;
		this.save_user(table.rowsHash(), (user) => {
			if (name)
				$this.apickli.storeValueInScenarioScope(name, user._id);
			callback();
		});
	});
};