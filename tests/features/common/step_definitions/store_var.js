module.exports = function() {
	this.Given(/^Store in (.+)$/, function (variable, val, callback) {
		this.apickli.storeValueInScenarioScope(variable, val);
		callback();
	});
};
