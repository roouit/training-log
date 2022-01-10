# Training log

[![Current Version][current-version]][current-version]

> Tracks your progress in the gym without pen and paper

![](docs/header.png)

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
  - [ ] Create robust error handling in the UI
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

* **Frontend**
  * *React*
* **Backend**
  * *Node.js*
  * *Express.js*
  * *MariaDB*

# API documentation

This section contains information about what resources are exposed by the REST API and how to use it.

# User

User is a resource that represents data related to a user of the application.

## <code>GET</code> User

    GET api/v1/users/:user_id
    
Returns a single user specified by the id

## Parameters

### URL
Field | Data Type | Required | Description
--- | --- | --- | ---
user_id | number | Y | The id of the user

## Example
### Request

    GET https://simple-training-log.herokuapp.com/api/v1/users/2

### Response
`200` `OK`
``` json
{
  "id": 2,
  "username": "testi",
  "first_name": "Etunimi",
  "last_name": "Sukunimi",
  "email": "abc@gmail.com"
}
```

## <code>DELETE</code> Delete User

    DELETE api/v1/users/:user_id
    
Removes a single user specified by the id

## Parameters

### URL
Field | Data Type | Required | Description
--- | --- | --- | ---
user_id | number | Y | The id of the user

## Example
### Request

    DELETE https://simple-training-log.herokuapp.com/api/v1/users/2

### Response

`200` `OK`

``` json
{
  "message": "delete successful"
}
```

## <code>POST</code> Create User

    POST api/v1/users
    
Create a new user and return the newly created user

## Parameters

### JSON
Field | Data Type | Required | Description
--- | --- | --- | ---
username | string | Y | The username of the user
first_name | string | Y | The first name of the user
last_name | string | Y | The last name of the user
email | string | Y | The email of the user

## Example
### Request

    POST https://simple-training-log.herokuapp.com/api/v1/users

### Request body
``` json
{
  "username": "pekka52",
  "first_name": "Pekka",
  "last_name": "Pekkanen",
  "email": "pekka@gmail.com"
}
```

### Response
`201` `Created`
``` json
{
  "id": 42,
  "username": "pekka52",
  "first_name": "Pekka",
  "last_name": "Pekkanen",
  "email": "pekka@gmail.com"
}
```

## <code>PUT</code> Update User

    PUT api/v1/users/:user_id
    
Update the user data with provided body of data

## Parameters

### URL
Field | Data Type | Required | Description
--- | --- | --- | ---
user_id | number | Y | The id of the user

### JSON
Field | Data Type | Required | Description
--- | --- | --- | ---
username | string | Y | The username of the user
first_name | string | Y | The first name of the user
last_name | string | Y | The last name of the user
email | string | Y | The email of the user

## Example
### Request

    PUT https://simple-training-log.herokuapp.com/api/v1/users/42

### Request body
``` json
{
  "username": "pekka52",
  "first_name": "Pekka",
  "last_name": "Pekkanen",
  "email": "pekka@gmail.com"
}
```

### Response
`200` `OK`
``` json
{
  "message": "update successful"
}
```

# Exercise

Exercise is a resource that represents data related to an exercise in the application.

## <code>GET</code> Exercises list

    GET api/v1/exercises/
    
Returns a list of all exercises in the database

## Parameters

None

## Example
### Request

    GET https://simple-training-log.herokuapp.com/api/v1/exercises

### Response
`200` `OK`
``` json
[
  {
    "id": 1,
    "exercise_name": "Back squat"
  },
  {
    "id": 5,
    "exercise_name": "Bench press"
  },
  {
    "id": 9,
    "exercise_name": "Bent row"
  },
  {
    "id": 8,
    "exercise_name": "Chin up"
  },
  {
    "id": 3,
    "exercise_name": "Deadlift"
  },
  {
    "id": 2,
    "exercise_name": "Front squat"
  },
  {
    "id": 10,
    "exercise_name": "Goblet squat"
  },
  {
    "id": 15,
    "exercise_name": "Pull down"
  }
]
```

## <code>GET</code> Exercise

    GET api/v1/exercises/:exercise_id
    
Returns a single exercise specified by the id

## Parameters

### URL
Field | Data Type | Required | Description
--- | --- | --- | ---
exercise_id | number | Y | The id of the exercise

## Example
### Request

    GET https://simple-training-log.herokuapp.com/api/v1/exercises/10

### Response
`200` `OK`
``` json
{
  "id": 10,
  "exercise_name": "Goblet squat"
}
```

## <code>DELETE</code> Delete Exercise

    DELETE api/v1/exercises/:exercise_id
    
Removes a single exercise specified by the id

## Parameters

### URL
Field | Data Type | Required | Description
--- | --- | --- | ---
exercise_id | number | Y | The id of the exercise

## Example
### Request

    DELETE https://simple-training-log.herokuapp.com/api/v1/exercises/2

### Response

`200` `OK`

``` json
{
  "message": "delete successful"
}
```

## <code>POST</code> Create Exercise

    POST api/v1/exercises
    
Create a new exercise and return the newly created exercise

## Parameters

### JSON
Field | Data Type | Required | Description
--- | --- | --- | ---
exercise_name | string | Y | The name of the exercise

## Example
### Request

    POST https://simple-training-log.herokuapp.com/api/v1/exercises

### Request body
``` json
{
  "exercise_name": "Overhead squat"
}
```

### Response
`201` `Created`
``` json
{
  "id": 20,
  "exercise_name": "Overhead squat"
}
```

## <code>PUT</code> Update Exercise

    PUT api/v1/exercises/:exercise_id
    
Update the exercise data with provided body of data

## Parameters

### URL
Field | Data Type | Required | Description
--- | --- | --- | ---
exercise_id | number | Y | The id of the exercise

### JSON
Field | Data Type | Required | Description
--- | --- | --- | ---
exercise_name | string | Y | The name of the exercise

## Example
### Request

    PUT https://simple-training-log.herokuapp.com/api/v1/exercises/20

### Request body
``` json
{
  "exercise_name": "OH squat"
}
```

### Response
`200` `OK`
``` json
{
  "message": "update successful"
}
```

<!-- Markdown link & img dfn's -->
[current-version]: https://img.shields.io/badge/version-0.0.1-yellow