FROM node:6.5.0

ADD . /app
WORKDIR /app

RUN adduser --disabled-password --gecos '' runner

USER runner

CMD node node_modules/nodemon/bin/nodemon.js -L