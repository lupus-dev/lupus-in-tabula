#!/bin/bash

do_tests="false"
do_build="true"
do_npm="true"
do_tsc="true"
is_verbose="false"

function red() {
	echo -e "\033[1;31m$@\033[0m"
}

function green() {
	echo -e "\033[1;32m$@\033[0m"
}

function print_help() {
	green "Preparation script for lupus-in-tabula"
	echo "  https://github.com/lupus-dev/lupus-in-tabula"
	echo ""
	echo "Valid options:"
	echo "   -b  Don't build the containers"
	echo "   -n  Don't run 'npm install' in the containers"
	echo "   -t  Build and install also the test suite"
	echo "   -j  Don't compile the TypeScript in Javascript"
	echo "   -v  Log everything to the console"
	echo "   -h  Show this help and exit"
}

function run_in_container() {
	container=$1
	shift
	entrypoint=$1
	shift
	command=$@

	# since lupus-common doesn't have a container a fake one is used
	if [ $container == 'lupusintabula_lupus-common' ]; then
		docker run --rm -v $(pwd):/app --entrypoint $entrypoint --workdir /app node:6.5.0 $command
		return
	fi

	volumes="-v $(pwd)/../lupus-common:/lupus-common"
	if [ $container == "lupusintabula_lupus-tests" ]; then
		volumes="$volumes -v $(pwd):/app/tests"
	else
		volumes="$volumes -v $(pwd):/app"
	fi

	docker run --rm $volumes --entrypoint $entrypoint $container $command
}

function run_with_verbose() {
	command=$@
	if [ $is_verbose == "true" ]; then
		$command
	else
		$command >/tmp/log-$service.txt 2>&1
		code=$?

		if [ $code != 0 ]; then
			red "Command failed with code $code"
			red "Command was $command"
			cat /tmp/log-$service.txt

			cd ..
			exit 1
		fi
	fi
}

while getopts ":bntjvh" opt; do
	case $opt in
		b)
			do_build="false"
			;;
		n)
			do_npm="false"
			;;
		t)
			do_tests="true"
			;;
		j)
			do_tsc="false"
			;;
		v)
			is_verbose="true"
			;;
		h)
			print_help
			exit
			;;
		\?)
			red "Invalid option -$OPTARG" >&2
			print_help
			exit 1
			;;
	esac
done

if [ $do_build == "true" ]; then
	green "Building the containers using docker-compose"
	run_with_verbose docker-compose -f docker-compose.tests.yml build

	green "Building the lupus-frontend container"
	run_with_verbose docker build lupus-frontend -t lupusintabula_lupus-frontend
fi

if [ $do_tests == "true" ]; then
	cd tests

	green "Building the lupus-tests container"
	run_with_verbose docker build -t lupusintabula_lupus-tests .

	green "Installing npm dependencies in tests"
	run_with_verbose run_with_verbose run_in_container "lupusintabula_lupus-tests" npm install

	cd ..
fi

if [ $do_npm == "true" ]; then
	green "Installing dependencies in the containers"

	# a piece of magic that find the real project folders
	services=$(find . -maxdepth 2 -type f -name '*package.json' -not -path './tests/package.json' | sed -r 's|/[^/]+$||' | sed -r 's|^\./||')

	green "Services to be installed:"
	for service in $services; do green "    $service"; done

	for service in $services; do
		green "Installing $service"
		cd $service

		if [ -f ./bin/prepare.sh ]; then
			run_with_verbose ./bin/prepare.sh
		else
			run_with_verbose run_in_container "lupusintabula_$service" npm install
		fi

		cd ..
	done
fi

if [ $do_tsc == "true" ]; then
	green "Compiling the TypeScript in Javascript"
	cd lupus-frontend
	run_with_verbose run_in_container lupusintabula_lupus-frontend npm run tsc
	cd ..
fi