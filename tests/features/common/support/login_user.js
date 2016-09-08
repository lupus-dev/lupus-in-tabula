module.exports = function(username, password, callback) {
	this.apickli.addRequestHeader('Content-Type', 'application/json');
	var credentials = { username: username, password: password };
	this.apickli.setRequestBody(JSON.stringify(credentials));
	this.apickli.post('/users/session', (err, response) => {
		this.apickli.requestBody = '';
		this.apickli.headers = {};
		callback(JSON.parse(response.body));
	});
};