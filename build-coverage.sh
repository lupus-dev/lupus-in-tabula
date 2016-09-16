#!/bin/bash

services="lupus-game lupus-history lupus-users"
do_send_coverage="false"

function red() {
	echo -e "\033[1;31m$@\033[0m"
}

function green() {
	echo -e "\033[1;32m$@\033[0m"
}

function run() {
	green $@
	$@
}

function patchCoverage() {
	run sed -i -e "s/\"\/app/\"$1/g" $1/coverage/coverage.json
}

function stopContainer() {
	pid=$(docker top lupusintabula_$1_1 -e opid,cmd | tail -n 1 | awk '{ print $1 }')
	run run kill -s INT $pid
}

if [[ "$1" == "--send" ]]; then
	do_send_coverage="true"
fi

run mkdir -p coverage

# Stop the containers allowing istanbul to crete lcov data
for service in $services; do
	stopContainer $service
done

run sleep 2s

# Patch the coverage results removing /app and adding the correct path
for service in $services; do
	patchCoverage $service
	run cp $service/coverage/coverage.json coverage/$service.coverage.json
done

# merge all the results together
node ./tests/node_modules/.bin/istanbul report --include "coverage/**.json"

if [[ $do_send_coverage == "true" ]]; then
	node ./tests/node_modules/.bin/coveralls < coverage/lcov.info
	node ./tests/node_modules/.bin/codeclimate-test-reporter < coverage/lcov.info
fi