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







# Workout

Workout is a resource that represents data related to a workout, which belongs to a single User in the application.

## <code>GET</code> Workouts list

    GET api/v1/users/:user_id/workouts/
    ?:offset
    &:limit
    &[:asc]
    &[:olderThan]
    &[:date]
    
Returns a list of all workouts that match the search parameters.

## Parameters

### URL
Field | Data Type | Required | Description
--- | --- | --- | ---
user_id | number | Y | The id of the user
offset | number | Y | A positive integer that is used to offset the first returned row from the database. I.e. if offset=5, then first five rows are skipped.
limit | number | Y | A positive integer that is used to limit the number of rows returned.
asc | boolean | N | A boolean value that specifies if the results are sorted in ascending order by date. `default = false`
olderThan | boolean | N | A boolean value that specifies if the results are older than the cutoff date. `default = false`
date | string | N | A cutoff date string (e.g. "2021-12-01 12:00") that is used to filter returned data. If `olderThan` is true, then workouts older than this date are returned, otherwise vice versa. `default = 0000-00-00 00:00`

## Example
### Request

    GET https://simple-training-log.herokuapp.com/api/v1/users/2/workouts
    ?offset=0
    &limit=3
    &asc=true
    &date=2022-01-01 18:00

### Response
`200` `OK`
``` json
[
  {
    "workout_id": 49,
    "user_id": 2,
    "date": "2022-01-04T11:16:00.000Z",
    "entries": [
      {
        "id": 64,
        "exercise_id": 1,
        "set_number": 1,
        "repetitions": 1,
        "load": 2
      }
    ]
  },
  {
    "workout_id": 51,
    "user_id": 2,
    "date": "2022-01-05T12:00:00.000Z",
    "entries": [
      {
        "id": 67,
        "exercise_id": 1,
        "set_number": 1,
        "repetitions": 1,
        "load": 2
      },
      {
        "id": 68,
        "exercise_id": 5,
        "set_number": 1,
        "repetitions": 3,
        "load": 4
      }
    ]
  },
  {
    "workout_id": 50,
    "user_id": 2,
    "date": "2022-01-06T12:12:00.000Z",
    "entries": [
      {
        "id": 65,
        "exercise_id": 1,
        "set_number": 1,
        "repetitions": 1,
        "load": 2
      },
      {
        "id": 66,
        "exercise_id": 1,
        "set_number": 2,
        "repetitions": 3,
        "load": 4
      }
    ]
  }
]
```

## <code>GET</code> Workout

    GET api/v1/user/:user_id/workouts/:workout_id
    
Returns a single workout specified by the id

## Parameters

### URL
Field | Data Type | Required | Description
--- | --- | --- | ---
user_id | number | Y | The id of the user
workout_id | number | Y | The id of the workout

## Example
### Request

    GET https://simple-training-log.herokuapp.com/api/v1/workouts/50

### Response
`200` `OK`
``` json
[
  {
    "workout_id": 50,
    "user_id": 2,
    "date": "2022-01-06T12:12:00.000Z",
    "entries": [
      {
        "id": 50,
        "exercise_id": 1,
        "set_number": 1,
        "repetitions": 1,
        "load": 2
      },
      {
        "id": 50,
        "exercise_id": 1,
        "set_number": 2,
        "repetitions": 3,
        "load": 4
      }
    ]
  }
]
```

## <code>DELETE</code> Delete Workout

    DELETE api/v1/users/:user_id/workouts/:workout_id
    
Removes a single workout specified by the id

## Parameters

### URL
Field | Data Type | Required | Description
--- | --- | --- | ---
workout_id | number | Y | The id of the workout

## Example
### Request

    DELETE https://simple-training-log.herokuapp.com/api/v1/users/2/workouts/49

### Response

`200` `OK`

``` json
{
  "message": "delete successful"
}
```

## <code>POST</code> Create Workout

    POST api/v1/users/:user_id/workouts
    
Create a new workout for a User and return the newly created workout

## Parameters

### JSON
Field | Data Type | Required | Description
--- | --- | --- | ---
user_id | number | Y | The id of the user to whom this workout belongs to
date | string | Y | The date when the workout was performed
entries | array | Y | An array of objects, which each represent a set of one exercise in the workout

### Object in array `entries`
Field | Data Type | Required | Description
--- | --- | --- | ---
exercise_id | number | Y | The id of the exercise performed
set_number | number | Y | An ordinal number that indicates which set of specified exerise this entry is. Set number must start at 1 for all exercises and increment by 1 for each new set.
repetitions | number | Y | Number of repetitions performed in this set
load | number | Y | Load in kilograms that was lifted

## Example
### Request

    POST https://simple-training-log.herokuapp.com/api/v1/workouts

### Request body
``` json
{
    "user_id": 2,
    "date": "2022-01-11T11:00",
    "entries": [
      {
        "exercise_id": 6,
        "set_number": 1,
        "repetitions": 7,
        "load": 5
      },
      {
        "exercise_id": 6,
        "set_number": 2,
        "repetitions": 7,
        "load": 5
      },
      {
        "exercise_id": 8,
        "set_number": 1,
        "repetitions": 15,
        "load": 25
      },
      {
        "exercise_id": 8,
        "set_number": 2,
        "repetitions": 15,
        "load": 30
      }
    ]
}
```

### Response
`201` `Created`
``` json
{
  "workout_id": 69,
  "user_id": 2,
  "date": "2022-01-11T11:00",
  "entries": [
    {
      "exercise_id": 6,
      "set_number": 1,
      "repetitions": 7,
      "load": 5,
      "id": 93
    },
    {
      "exercise_id": 6,
      "set_number": 2,
      "repetitions": 7,
      "load": 5,
      "id": 94
    },
    {
      "exercise_id": 8,
      "set_number": 1,
      "repetitions": 15,
      "load": 25,
      "id": 95
    },
    {
      "exercise_id": 8,
      "set_number": 2,
      "repetitions": 15,
      "load": 30,
      "id": 96
    }
  ]
}
```

## <code>PUT</code> Update Workout

    PUT api/v1/users/:user_id/workouts/:workout_id
    
Update the workout data with provided body of data. Only the fields that are provided in the body are used to update the workout data in database.

## Parameters

### URL
Field | Data Type | Required | Description
--- | --- | --- | ---
user_id | number | Y | The id of the user
workout_id | number | Y | The id of the workout

### JSON
Field | Data Type | Required | Description
--- | --- | --- | ---
date | string | N | The date when the workout was performed
entries | array | N | An array of objects, one for each set to be modified. An object must include set `id`, but other parameters aren't required

### Object in array `entries`
Field | Data Type | Required | Description
--- | --- | --- | ---
id | number | Y | The id of the entry (set)
repetitions | number | N | Number of repetitions performed in this set
load | number | N | Load in kilograms that was lifted

## Example
### Request

    PUT https://simple-training-log.herokuapp.com/api/v1/users/2/workouts/69

### Request body
``` json
{
  "date": "2021-12-11 08:00:00",
  "entries": [
    {
      "id": 96,
      "repetitions": 20
    }
  ]
}
```

### Response
`200` `OK`
``` json
{
  "message": {
    "workout": "update successful",
    "entries": "update successful"
  }
}
```

<!-- Markdown link & img dfn's -->
[current-version]: https://img.shields.io/badge/version-0.0.1-yellow