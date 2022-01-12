# User REST API documentation

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
