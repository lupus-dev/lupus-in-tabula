FROM node:6.5.0

WORKDIR /app/tests

RUN adduser --disabled-password --gecos '' runner

USER runner

ENTRYPOINT ["node", "node_modules/.bin/cucumber-js"]
