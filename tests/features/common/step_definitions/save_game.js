module.exports = function() {
	this.Given(/^There was a game in the database ?(.*)$/, function (name, table, callback) {
		this.save_game(table.rowsHash(), (game) => {
			if (name)
				this.apickli.storeValueInScenarioScope(name, game._id);
			callback();
		});
	});
};