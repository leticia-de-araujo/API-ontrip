# Users

The User object is defined as:

| **Field**   | **Type** | **Description**                                   |
| ----------- | -------- | ------------------------------------------------- |
| id          | string   | User's unique identifier                          |
| username    | string   | User name                                         |
| email       | string   | User email                                        |
| password    | string   | User password                                     |
| dateOfBirth | Date     | User's date of birth                              |
| isAdm       | boolean  | Defines whether a user is an administrator or not |
| isActive    | boolean  | Defines whether a user is active or not           |
| photo       | File     | Specifies the file of the user's profile image    |

<br>

### **Endpoints**

| **Method** | **Route**  | **Description**                                 |
| ---------- | ---------- | ----------------------------------------------- |
| POST       | /users     | Creates a user                                  |
| GET        | /users     | List all users                                  |
| GET        | /users/:id | Lists a user using its id as a parameter        |
| PATCH      | /users/:id | Updates a user using its ID as a parameter      |
| DELETE     | /users/:id | Soft-deletes a user using its ID as a parameter |

<br>

## POST /users

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: none
- Content-type: application/json

<br>

**Request body example**

```json
{
  "username": "Bob Spencer",
  "email": "bobspencer@email.com",
  "password": "874aS4A6F65i",
  "dateOfBirth": "14/03/1993",
  "photo": "L2dvYWwgbW9yZJShu54j98vgSD79",
  "isAdm": false
}
```

<br>

#### Expected Response:

<br>

**Status 201 - Created**

```json
{
  "message": "User created with success",
  "user": {
    "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
    "username": "Bob Spencer",
    "email": "bobspencer@email.com",
    "dateOfBirth": "14/03/1993",
    "photo": "L2dvYWwgbW9yZJShu54j98vgSD79",
    "isAdm": false,
    "isActive": true
  }
}
```

<br>

#### Error Responses:

<br>

**Status 400 - Bad request**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Bad request, please make sure you have sent all the required information"
}
```

**Status 409 - Email already exists**

```json
{
  "status": "Error",
  "code": 409,
  "message": "This email already exists"
}
```

#

## GET /users

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
- Content-type: application/json
- Empty Body

<br>

**Request headers**

```json
{
  "authorization": "Bearer Admin Token"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Successful request",
  "users": [
    {
    "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
    "username": "Bob Spencer",
    "email": "bobspencer@email.com",
    "dateOfBirth": "14/03/1993",
    "photo": "L2dvYWwgbW9yZJShu54j98vgSD79",
    "isAdm": false,
    "isActive": true
    },
    ...
  ]
}
```

<br>

#### Error Responses:

<br>

**Status 401 - Invalid Token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid Token"
}
```

<br>

**Status 401 - Missing Admin Token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing Admin Token"
}
```

#

## GET /users/:id

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
- Content-type: application/json
- Empty Body

<br>

**Request headers**

```json
{
  "authorization": "Bearer Admin Token or Owner Token"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Successful request",
  "user": {
    "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
    "username": "Bob Spencer",
    "email": "bobspencer@email.com",
    "dateOfBirth": "14/03/1993",
    "photo": "L2dvYWwgbW9yZJShu54j98vgSD79",
    "isAdm": false,
    "isActive": true
  }
}
```

<br>

#### Error Responses:

<br>

**Status 401 - Missing Admin or Owner Token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing Admin or Owner Token"
}
```

**Status 404 - User not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "User not found"
}
```

#

## PATCH /users/:id

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
- Content-type: application/json

<br>

**Request headers**

```json
{
  "authorization": "Bearer Admin Token or Owner Token"
}
```

**Request body example**

```json
{
  "email": "bob_spencer45@email.com",
  "photo": "gbW9yZJ65652gfhgShu54j98vgSD79"
}
```

<br>

#### Expected Responses:

<br>

**Status 200 - OK**

```json
{
  "message": "User updated with success",
  "user": {
    "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
    "username": "Bob Spencer",
    "email": "bob_spencer45@email.com",
    "dateOfBirth": "14/03/1993",
    "photo": "gbW9yZJ65652gfhgShu54j98vgSD79",
    "isAdm": false,
    "isActive": true
  }
}
```

<br>

#### Expected Errors:

<br>

**Status 401 - Missing Admin Token or Owner Token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing Admin Token or Owner Token"
}
```

**Status 409 - Email already exists**

```json
{
  "status": "Error",
  "code": 409,
  "message": "Email already exists"
}
```

**Status 404 - User not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "User not found"
}
```

**Status 400 - Bad request**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Bad request, please make sure you have sent all the required information"
}
```

#

## DELETE /users/:id

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
- Content-type: application/json
- Empty Body

**Request headers**

```json
{
  "authorization": "Bearer Admin Token or Owner Token"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "User deleted with success"
}
```

<br>

#### Expected Errors:

<br>

**Status 401 - Missing Admin Token or Owner Token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing Admin Token or Owner Token"
}
```

**Status 404 - User not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "User not found"
}
```

<br>

#
