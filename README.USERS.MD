## POST /users

<br>

#### Request:

```
body:{
    "username": "string",
    "email": "string",
    "password": "string",
    "dateOfBirth": "string",
    "photo": "string-base64",
    "isAdm": "boolean",
}
```

<br>

#### Expected Response:

<br>

**Status - 201**

```
body:{
    "message": "User created",

    "data":{
    "id": "string",
    "username": "string",
    "email": "string",
    "dateOfBirth": "string",
    "isAdm": "false",
    "isActive": "true",
    "photo": "string-base64"
    }
}
```

<br>

#### Error Responses:

<br>

**Status - 400**

```
body:{
    "status": "Error",
    "code": 400,
    "message": "Bad request, check if you sent all neccessary info and the spelling"
}
```

**Status - 403**

```
body:{
    "status": "Error",
    "code": 403,
    "message": "Email already exists, User Already exists..."
}
```

#

## GET /users/:id

<br>

#### Request:

```
headers:{
    "authorization": "Bearer Admin Token or owner Token",
}
```

<br>

#### Expected Response:

<br>

**Status - 200**

```
body:{
    "message": "Success",

    "data":{
    "id": "string",
    "username": "string",
    "email": "string",
    "dateOfBirth": "string",
    "isAdm": "false",
    "isActive": "true",
    "photo": "string-base64"
    }
}
```

<br>

#### Error Responses:

<br>

**Status - 401**

```
body:{
    "status": "Error",
    "code": 401,
    "message": "Admin token required or you must be the owner"
}
```

**Status - 404**

```
body:{
    "status": "Error",
    "code": 404,
    "message": "User not found"
}
```

#

## PATCH /users/:id

<br>

#### Request:

```
headers:{
    "authorization": "Bearer Admin Token or owner Token",
}
```

```
body:{
    "username": "string",
    "email": "string",
    "password": "string",
    "dateOfBirth": "string",
    "photo": "string-base64",
    "isAdm": "boolean",
}
```

<br>

#### Expected Responses:

<br>

**Status - 200**

```
body:{
    "message": "User updated",

    "data":{
    "id": "string",
    "username": "string",
    "email": "string",
    "dateOfBirth": "string",
    "isAdm": "false",
    "isActive": "true",
    "photo": "string-base64"
    }
}
```

<br>

#### Expected Errors:

<br>

**Status - 401**

```
body:{
    "status": "Error",
    "code": 401,
    "message": "Admin token required or you must be the owner"
}
```

**Status - 403**

```
body:{
    "status": "Error",
    "code": 403,
    "message": "Email already exists"
}
```

**Status - 404**

```
body:{
    "status": "Error",
    "code": 404,
    "message": "User not found"
}
```

**Status - 400**

```
body:{
    "status": "Error",
    "code": 400,
    "message": "Bad request, check if you sent all neccessary info and the spelling"
}
```

#

## DELETE /users/:id

<br>

#### Request:

```
headers:{
    "authorization": "Bearer Admin Token or owner Token",
}
```

<br>

#### Expected Response:

<br>

**Status - 200**

```
{
    "message": "user deleted with success!"
}
```

<br>

#### Expected Errors:

<br>

**Status - 401**

```
body:{
    "status": "Error",
    "code": 401,
    "message": "Admin token required or you must be the owner"
}
```

**Status - 404**

```
body:{
    "status": "Error",
    "code": 404,
    "message": "User not found"
}
```

## POST /login

<br>

#### Request:

```
header: {
authorization: "Bearer token"
}
```

```
body:
{
    "email": "example@email.com",
    "password": "example123",
}
```

<br>

#### Expected Response:

<br>

**Status - 201**

```
body:
{
"id": "uuid"
"name": "example",
"email": "example@email.com",
"dateOfBirth": "yyyy/mm/dd",
"isAdm": false,
"isActive": true,
"photo": "string-base64",
}
```

<br>

#### Error Responses:

<br>

**Status - 400**

```
body: {
"status": "Error",
"code": 400,
"message": "(any object key) is a required field"
}
```

<br>

**Status - 400**

```
body: {
"status": "Error",
"code": 400,
"message": "(any object key) has an invalid type"
}
```

<br>

**Status - 413**

```
body: {
"status": "Error",
"code": 413,
"message": "(object key) length too large"
}
```

<br>

**Status - 404**

```
body: {
"status": "Error",
"code": 404,
"message": "User not found"
}
```

<br>

#
