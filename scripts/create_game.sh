#!/bin/bash

N=10
USERS_API="http://localhost:3000/api/users"
HISTORY_API="http://localhost:3000/api/history"
GAME_API="http://localhost:3000/api/game"

function post() {
	url=$1
	token=$2
	data=$3
	curl    -X POST \
			-H "Content-Type: application/json" \
			-H "Authorization: token $token" \
			-d "$data" \
			-s \
			$url
}

function login() {
	username=$1
	password=$2

	post $USERS_API/session no-token "{\"username\":\"$username\",\"password\":\"$password\"}" | cut -d'"' -f6
}

if [ "$#" -ge "1" ]; then
	N=$1
fi

token=$(login user1 pass1)

res=$(post $HISTORY_API/games $token "{\"name\":\"Game\",\"gen_info\":{\"min_players\":1,\"max_players\":$N}}")
game_id=$(echo $res | cut -d'"' -f 4)
echo "Game created: $game_id"

post $GAME_API/$game_id/open $token "" > /dev/null
echo "Game opened"

for ((i=2; i<=$N; i++)); do
	token=$(login user$i pass$i)

	post $GAME_API/$game_id/join $token "" > /dev/null
	echo "user$i joined the game"
done
