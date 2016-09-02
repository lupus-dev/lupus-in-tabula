FROM node:6.5.0

ADD . /app
WORKDIR /app

RUN npm install

ENTRYPOINT node node_modules/nodemon/bin/nodemon.js -L