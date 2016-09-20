module.exports = function() {
	this.Then(/^I print the response$/, function(callback) {
		var response = this.apickli.getResponseObject();
		console.log('State: ' + response.statusCode);
		console.log('Headers:', response.headers);
		console.log('Body:', response.body);
		callback();
	});
};
