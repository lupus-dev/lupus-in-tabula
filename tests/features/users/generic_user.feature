@users
Feature:

	An anonymous user can ask for some users data

	@clear
	Scenario: Fetch the information about a single user
		Given There was a registered user reg_user_id
		| username | "edomora97"  |
		| name     | "Edoardo"    |
		| surname  | "Morassutto" |
		| level    | 42           |
		When I GET /users/`reg_user_id`
		Then response code should be 200
		And  response body should be valid json
		And  The user at index `reg_user_id` should be
		| username | "edomora97"  |
		| name     | "Edoardo"    |
		| surname  | "Morassutto" |
		| level    | 42           |

	@clear
	Scenario: Fetch the information about 2 users
		Given There was a registered user reg_user_id_1
		| username | "edomora97"  |
		| name     | "Edoardo"    |
		| surname  | "Morassutto" |
		| level    | 42           |
		Given There was a registered user reg_user_id_2
		| username | "gion"       |
		| name     | "Andrei"     |
		| surname  | "Oanca"      |
		| level    | 12           |
		When I GET /users/`reg_user_id_1`,`reg_user_id_2`
		Then response code should be 200
		And  response body should be valid json
		And  The user at index `reg_user_id_1` should be
		| username | "edomora97"  |
		| name     | "Edoardo"    |
		| surname  | "Morassutto" |
		| level    | 42           |
		And  The user at index `reg_user_id_2` should be
		| username | "gion"       |
		| name     | "Andrei"     |
		| surname  | "Oanca"      |
		| level    | 12           |

	@clear
	Scenario: Return 200 if part of the users were found
		Given There was a registered user reg_user_id
		| username | "edomora97"  |
		| name     | "Edoardo"    |
		| surname  | "Morassutto" |
		| level    | 42           |
		When I GET /users/123aaabbbccc,`reg_user_id`
		Then response code should be 200
		And  response body should be valid json
		And  The user at index `reg_user_id` should be
		| username | "edomora97"  |
		| name     | "Edoardo"    |
		| surname  | "Morassutto" |
		| level    | 42           |
		And  response body path 123aaabbbccc should be undefined

	@clear
	Scenario: Return 404 if no users were found
		When I GET /users/123aaabbbccc
		Then response code should be 404
		And  response body should be valid json
