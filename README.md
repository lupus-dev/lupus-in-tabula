# lupus in tabula [![Build Status](https://travis-ci.org/lupus-dev/lupus-in-tabula.svg?branch=master)](https://travis-ci.org/lupus-dev/lupus-in-tabula) [![Code Climate](https://codeclimate.com/github/lupus-dev/lupus-in-tabula/badges/gpa.svg)](https://codeclimate.com/github/lupus-dev/lupus-in-tabula)

This is the main repository of Lupus in Tabula!

## Dependencies

This application requires some dependencies to be installed on the system. The only operating
system that we support is Linux. If you are on Windows or OSx it could not work as fine.

- [Docker](https://www.docker.com/): [Installation](https://docs.docker.com/engine/installation/linux/)
- [Docker Composer](https://docs.docker.com/compose/): [Installation](https://docs.docker.com/compose/install/)

Optional dependencies:

- [Node](https://nodejs.org/en/)


## Build

This web applications uses some containers to isolate the microservices. Each microservice
has its own Docker container which has to be built before the use.

In the root folder of the project there is the `prepare.sh` script that automagically build
all you need.

TIP: `$ ./prepare.sh -h`

## Run the application

Using docker-compose is really simple to start all the components of the stack:

```
$ docker-compose up
```

With this setup one instance of each microserivce is started and the `lupus-proxy` service
exposes all the resources at a single endpoint. You can reach it at `localhost:3000`.

For conviniance this configuration of `lupus-proxy` serves all the APIs stuff at `/api/` and
the frontend at `/`.

## Production

You don't want to...