#!/bin/bash

function docker_run {
	echo "Run on docker: $@"
	docker run --rm \
		-v $(pwd):/app/tests \
		-v $(pwd)/../lupus-common:/lupus-common \
		--entrypoint bash \
		-it lupusintabula_lupus-tests \
		-c "$@"
}

docker_run "npm install"
docker_run "cp -r /lupus-common /app/tests/node_modules"