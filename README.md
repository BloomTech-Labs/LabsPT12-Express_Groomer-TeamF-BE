# express-groomer-be

![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)

For steps on how to work with this repository [please see here](https://docs.labs.lambdaschool.com/labs-spa-starter/)

# Project

You can find the deployed project at [Heroku](https://labspt12-express-groomer-f-api.herokuapp.com/).

## Contributors

|                                                         [Christian Berumen](https://github.com/cberumen51)                                                          |                                                            [David White](https://github.com/dvwhite)                                                             |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars0.githubusercontent.com/u/55672629?s=400&u=ceab0c2afdf999ea46592a74dd16ef12da34cb92&v=4" width = "200" />](https://github.com/cberumen51) | [<img src="https://avatars2.githubusercontent.com/u/47503507?s=460&u=1d0f89ffd75a88baf77680a614fe774c15ccb4b8&v=4" width = "200" />](https://github.com/dvwhite) | [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png" width = "200" />](https://github.com/) | [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-female.png" width = "200" />](https://github.com/) | [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png" width = "200" />](https://github.com/) |
|                             [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/cberumen51https://github.com/)                              |                                       [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/dvwhite)                                       | [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Mister-Corn) | [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/NandoTheessen) | [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/wvandolah) |
|                     [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/cberumen51/)                     |                 [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/david-white-dev/)                 | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) |

<br>
<br>

### Key Features

- Authenticates with Okta using the @okta/jwt-verifier library
- Relational database using the Postgres RDBMS
- REST architecture

#### Back end deployed to [Heroku](https://labspt12-express-groomer-f-api.herokuapp.com/)

#### [Front end](https://f.expressgroomer.dev/login) built using:

- React
- Redux
- Mapbox
- Ant Design

#### Key Libraries

- express
- @okta/jwt-verifier
- axios
- knex
- pg

#### Additional Libraries

- cookie-parser
- cors
- cross-env
- debug
- dotenv
- eslint
- faker
- helmet
- http-errors
- husky
- jest
- lint-staged
- morgan
- nodemon
- prettier
- supertest
- swagger-jsdoc
- swagger-ui-express

# APIs

## Authentication (Okta)

Okta authentication uses the `profileRouter` and `profileModel` files. Data persists in the `profile` table.

## Locations

Groomer business locations are stored in the `locations` table. The `locationRouter` and `locationModel` access and store the location data.

## Pets

Pet data is stored in the `pets` table. The `petRouter` and `petModel` access and store the location data.

## Getting Started

### Enviornment Variables

- `PORT` - API port (optional, but helpful with FE running as well)
  - The following ports are whitelisted for use with okta
    - 3000
    - 8000
    - 8080
- `DATABASE_URL` - connection string for postgres database
- `OKTA_URL_ISSUER` - The complete issuer URL for verifying okta access tokens. `https://example.okta.com/oauth2/default`
- `OKTA_CLIENT_ID` - the okta client ID.

See `.env` file for example values

### Setup postgres

There are 3 options to get postgresql installed locally [Choose one]:

1. Use docker. [Install](https://docs.docker.com/get-docker/) for your platform
   - run: `docker-compose up -d` to start up the postgresql database and pgadmin.
   - Open a browser to [pgadmin](http://localhost:5050/) and you should see the Dev server already defined.
   - If you need to start over you will need to delete the folder `$ rm -rf ./data/pg` as this is where all of the server data is stored.
     - if the database `api-dev` was not created then start over.
2. Download and install postgresql directly from the [main site](https://www.postgresql.org/download/)
   - make note of the port, username and password you use to setup the database.
   - Connect your client to the server manually using the values previously mentioned
   - You will need to create a database manually using a client.
   - Make sure to update the DATABASE_URL connection string with the values for username/password, databasename and server port (if not 5432).
3. Setup a free account at [ElephantSQL](https://www.elephantsql.com/plans.html)
   - Sign up for a free `Tiney Turtle` plan
   - copy the URL to the DATABASE_URL .env variable
   - make sure to add `?ssl=true` to the end of this url

### Setup the application

- create your project repo by forking or using this as a template.
- run: `npm install` to download all dependencies.
- confirm correct env variables in your `.env` file.
- run: `npm run knex migrate:latest` to create the starting schema.
- run: `npm run knex seed:run` to populate your db with some data.
- run: `npm run tests` to confirm all is setup and tests pass.
- run: `npm run watch:dev` to start nodemon in local dev enviornment.

> Make sure to update the details of the app name, description and version in
> the `package.json` and `config/jsdoc.js` files.

# Project Status

## Summary

Release #: 2 <br>
Release status: In progress<br>
Trello Board: (https://trello.com/b/ZfhxRCcq/labs-pt12-express-groomer-team-f)<br>
Whimsical (Architecture): (https://whimsical.com/architecture-diagram-ADh8unt91rRsvfsWk3YLfA)<br>
Whimsical (User Flow): (https://whimsical.com/express-groomer-UAEP3cKj4Nm9ZH5vxoaw7M)<br>

## Features Completed

The backend supports the following app features:

- The API is a fully functional Node/Express web application interfacing with a Postgres db
- Knex is used as the query builder used to create database model functions
- Authentication middleware enables the front end to use Okta authentication
- Authorization middleware in the `pets` route handlers restricts changes made to pet records. Only the pet’s owner is permitted to modify a pet record, including updating or deleting it

- There are three database tables:

  1. `profiles` : The profile data populated from both Okta and user entries
  2. `locations` : The groomer’s business location data, including business name and address
  3. `pets` : The client’s pet data, including pet name, type, and a flag for whether the pet has all shots up to date

- Each table has an accompany node router:

  1. `profileRouter`, for controlling the data to/from the `profiles` table
  2. `locationRouter`, for controlling data to/from the `locations` table
  3. `petRouter`, for controlling data to/from the `pets` table

Using the `profiles` table and the `profileRouter`, users can:

- Create an account and register as either a client or a groomer
- Users of either type can login using Okta authentication
- Users can persist user profile data in the `profiles` table using the `profileRouter`

Using the `locations` table and `locationRouter`, users can:

- Groomers can add profile data in their profile page with information about their business
- The Mapbox component can reference the latitude and longitude of a groomer's location (support for this)
- The Mapbox component can include the groomer's business name in the popup (support for this)

Using the `pets` table and `petRouter`, users can:

- Clients can enter pet details in their profile or pet pages and save the data to the `pets` table

There are basic unit tests of all route handlers and their HTTP methods.

## Features Still Remaining

1. Finish release 2

- Add a pet health issues table and pet health issues router
- Add a join table for a many-to-many relationship between pet health issues and pets, `pets_healthissues`
- Add an `appointments` table as per the architecture document:
  (Whimsical Architecture Diagram)[https://whimsical.com/architecture-diagram-ADh8unt91rRsvfsWk3YLfA]
- Add backend middleware, utils or controllers necessary to render data in an easy to use format for the frontend, especially for the `appointments` related features. For instance, one user story reads "As a groomer, I want to be able to see the requests that I get from users and manage them". It would be ideal to structure that data and output it in the desired manner for the front end devs to facilitate development.
- Add a `favorites` table with saved favorite groomers that the users can access and manage (full CRUD is probably needed)

2. All release 3 features, including those for the following user stories:

- As a client, I want to be able to pay in a convenient and fast way (Stripe)
- As a groomer, I want to be able to process payments from the customers and receive them in my bank account (Stripe)
- As a client, I want to be able to rate groomers based on my experience and provide comments

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

## Documentation

See [Backend Documentation](https://labspt12-express-groomer-f-api.herokuapp.com/api-docs/) for details on the backend of our project.
