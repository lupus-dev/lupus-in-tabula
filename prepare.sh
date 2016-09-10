#!/bin/bash

# build containers
docker-compose build
cd tests && npm run build && cd ..

# npm-install them all
for srv in $(find . -maxdepth 2 -type f -name '*package.json' | sed -r 's|/[^/]+$||'); do
	echo "Installing $srv"
	cd $srv
	npm run prepare 2> /tmp/prepare.log >/dev/null
	exitstatus=$?
	if [[ $exitstatus -gt 0 ]]; then
		cat /tmp/prepare.log
	fi
	cd ..
done

