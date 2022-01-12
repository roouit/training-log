# Training log

[![Current Version][current-version]][current-version]

> Tracks your progress in the gym without pen and paper

Clean and minimal user interface

![](docs/user.png)

Effortless to add new workouts

![](docs/new.png)

## About

A **training log** application for managing data related to **strength training**.

The app will support **basic CRUD operations** for individual training sessions, as well as **filtered and sorted views** of data.

This application was developed as a part of studies in TAMK to demonstrate skills in building a fullstack application.

## Release History

* **0.0.1**
    * Work in progress

## Todo

- Backend
  - [x] Initialize project
  - [x] Design and create database
  - [x] Create basic CRUD methods for database (user)
  - [x] Create basic CRUD methods for database (admin)
  - [x] Create filtering and sorting functionality
  - [x] Create robust error handling in the backend
  - [ ] (Optional) Add authentication
- Frontend
  - [x] Create simple frontend for accessing API endpoints
  - [x] Design and create a nice UI for the app
  - [x] Create robust error handling in the UI
- Other
  - [x] Host app in Heroku
  - [ ] (Optional) Add license, if made public

## Installation

Clone the repo

```
$ git clone https://github.com/roouit/training-log
```

Install dependencies

```
$ npm install
```

## Technology

* ### Frontend
  * **React** 17.0.2
  * [**Material UI**](https://mui.com/) 5.2.4
* ### Backend
  * **Node.js** 14.18.3 (Heroku)
  * **Express.js** 4.17.1
  * **MariaDB** 5.7.36-0ubuntu0.18.04.1-log

# REST API documentation

These documents describe what resources are exposed by the REST API and how to use them.

Documentation is split by resource:
* [User](src/api/v1/docs/user-api.md)
* [Exercise](src/api/v1/docs/exercise-api.md)
* [Workout](src/api/v1/docs/workout-api.md)

<!-- Markdown link & img dfn's -->
[current-version]: https://img.shields.io/badge/version-0.0.1-yellow