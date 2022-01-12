# Exercise REST API documentation

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