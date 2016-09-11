# lupus in tabula [![Build Status](https://travis-ci.org/lupus-dev/lupus-in-tabula.svg?branch=master)](https://travis-ci.org/lupus-dev/lupus-in-tabula) [![Code Climate](https://codeclimate.com/github/lupus-dev/lupus-in-tabula/badges/gpa.svg)](https://codeclimate.com/github/lupus-dev/lupus-in-tabula)

This is the main repository of Lupus in Tabula!

## Build

This web applications uses some containers to isolate the microservices. Each microservice
has its own Docker container which has to be built before the use.

In the root folder of the project there is the `prepare.sh` script that automagically build
all you need.

## Run the application

Using docker-compose is really simple to start all the components of the stack:

```
$ docker-compose up
```

With this setup one instance of each microserivce is started and the lupus-proxy service
exposes all the resources at a single endpoint. You can reach it at `localhost:3000`.