## Requirements

- Install Docker or install PostgreSQL
- Install the correct node version as indicated in `.nvmrc` file

## GuideLine

- Install packages, using: `yarn`
- Start Up the docker container, using: `yarn dev-db`
- Generate the db table and prisma client, using: `yarn prisma:dev`
- Run the server, using: `yarn start:dev`

## Commands

- This command updates your database using migrations during development and creates the database if it does not exist(use only in development environment): `yarn prisma:dev`
- This command deletes and recreates the database, or performs a 'soft reset' by removing all data, tables, indexes, and other artifacts (use only in development environment): `yarn prisma:reset`
- To test linting: `yarn lint`
- To test and fix automaticaly linting errors: `yarn lint:fix`
- To automaticaly prettify all files: `yarn pretty`
- To start project in production: `yarn start`
- To build project for production use:`yarn build`

## Commands

- You need to use `sudo` infront of every docker command if you are using Ubuntu or UNIX Destributions
- If you don't have docker install and your PostgreSQL server is running on port 5433 update the `env.development` file