# Bash CMD Backend

This project is the backend part of bash cmd handler built for educational purposes.

## Running application in Docker Container
create .env file with defaul values: 

```
PORT=9000
MONGO_URI=mongodb://mongodb:27017/bash-cmd
FRONTEND_URL=http://localhost
```
Then you need to run a command:
```bash
$ docker-compose up -d
```

Runs the app in the production mode.\
Open [http://localhost:9000](http://localhost:9000) to see healthcheck.

## Swagger

You can test api using Swagger.
Open [http://localhost:9000/api](http://localhost:9000/api) to see Swagger app.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

