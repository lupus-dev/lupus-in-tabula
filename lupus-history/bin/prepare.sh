#!/bin/bash

function docker_run {
	echo "Run on docker: $@"
	docker run --rm \
		-v $(pwd):/app \
		-v $(pwd)/../lupus-common:/lupus-common \
		--entrypoint bash \
		-it lupusintabula_lupus-history \
		-c "$@"
}

docker_run "npm install"
docker_run "cp -r /lupus-common /app/node_modules"