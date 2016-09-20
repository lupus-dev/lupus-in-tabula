module.exports = function() {
	this.Given(/^I set JSON body to$/, function (jsonBody, callback) {
		this.apickli.addRequestHeader('Content-Type', 'application/json');
		this.apickli.setRequestBody(jsonBody);
		callback();
	});
};
