#!/bin/bash

N=10
API="http://localhost:3000/api/users/"

function create_user() {
	username=$1
	password=$2
	echo "Creating user $username:$password"
	curl -X POST \
		 -H "Content-Type: application/json" \
		 -d "{\"username\":\"$username\",\"password\":\"$password\",\"surname\":\"$username\",\"name\":\"$username\"}" \
		 -s \
		 $API
	echo
}

if [ "$#" -ge "1" ]; then
	N=$1
fi

for ((i=1; i<=$N; i++)); do
	create_user user$i pass$i
done
