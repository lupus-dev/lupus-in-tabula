module.exports = function() {
	require('./step_definitions/setup').call(this);
	require('./step_definitions/login').call(this);
	require('./step_definitions/registered_user').call(this);
	require('./step_definitions/set_json_body').call(this);
	require('./step_definitions/print_response').call(this);
};