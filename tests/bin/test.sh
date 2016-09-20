#!/bin/bash

docker run --rm \
	--link lupusintabula_proxy_1:proxy \
	--link lupusintabula_mongo_1:mongo \
	--link lupusintabula_redis_1:redis \
	--network lupusintabula_default \
	-v $(pwd)/..:/app \
	-v $(pwd)/../lupus-common:/app/lupus-common \
	lupusintabula_lupus-tests $@
