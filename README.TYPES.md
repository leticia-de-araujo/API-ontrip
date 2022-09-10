# Types

The Type object is defined as:

| **Field** | **Type** | **Description**                         |
| --------- | -------- | --------------------------------------- |
| id        | string   | Type's unique identifier                |
| name      | string   | Type name                               |
| isActive  | boolean  | Defines whether a type is active or not |

<br>

### **Endpoints**

| **Method** | **Route**      | **Description**                                 |
| ---------- | -------------- | ----------------------------------------------- |
| POST       | /types         | Creates a type                                  |
| GET        | /types         | List all types                                  |
| GET        | /types/:typeId | Lists a type using its ID as a parameter        |
| PATCH      | /types/:typeId | Updates a type using its ID as a parameter      |
| DELETE     | /types/:typeId | Soft-deletes a type using its ID as a parameter |

<br>

## POST /types

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Admin Bearer Token
- User must be an admin to create a type
- Content-type: application/json

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

**Request body example**

```json
{
  "name": "A whole place"
}
```

<br>

#### Expected Response:

<br>

**Status 201 - Created**

```json
{
  "message": "Type created with success",
  "type": {
    "id": "d57d66cf-3feb-4849-9a86-b8b5654a74af",
    "name": "A whole place",
    "isActive": true
  }
}
```

<br>

#### Error Responses:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token"
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token"
}
```

<br>

**Status 401 - User is not an admin**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User is not an admin"
}
```

<br>

**Status 400 - Missing required field**

```json
{
  "status": "Error",
  "code": 400,
  "message": "(any object key) is a required field"
}
```

<br>

**Status 400 - Invalid data type**

```json
{
  "status": "Error",
  "code": 400,
  "message": "(any object key) has an invalid type"
}
```

<br>

**Status 413 - Data length too large**

```json
{
  "status": "Error",
  "code": 413,
  "message": "(object key) length too large"
}
```

<br>

**Status 409 - This type already exists**

```json
{
  "status": "Error",
  "code": 409,
  "message": "This type already exists"
}
```

<br>

#

## GET /types

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: None
- Content-type: application/json
- Empty body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Successful request",
  "types":
  [
    {
      "id": "d57d66cf-3feb-4849-9a86-b8b5654a74af",
      "name": "A whole place",
      "isActive": true
    },
  ...
  ]
}
```

<br>

#### Error Responses:

- No errors expected

#

## GET /types/:typeId

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: None
- Content-type: application/json
- Empty body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Successful request",
  "type": {
    "id": "d57d66cf-3feb-4849-9a86-b8b5654a74af",
    "name": "A whole place",
    "isActive": true
  }
}
```

<br>

#### Error Responses:

<br>

**Status 404 - Type not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Type not found"
}
```

<br>

#

## PATCH /types/:typeId

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Admin Bearer Token
- User must be an admin to update a type
- Content-type: application/json

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

**Request body example**

```json
{
  "name": "A shared place"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Type updated with success",
  "type": {
    "id": "d57d66cf-3feb-4849-9a86-b8b5654a74af",
    "name": "A shared place",
    "isActive": true
  }
}
```

<br>

#### Expected Errors:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token"
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token"
}
```

<br>

**Status 401 - User is not an admin**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User is not an admin"
}
```

<br>

**Status 400 - Invalid data type**

```json
{
  "status": "Error",
  "code": 400,
  "message": "(any object key) has an invalid type"
}
```

<br>

**Status 413 - Data length too large**

```json
{
  "status": "Error",
  "code": 413,
  "message": "(object key) length too large"
}
```

<br>

**Status 404 - Type not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Type not found"
}
```

<br>

**Status 400 - No changes in type data**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Not possible to update a type without having any changes in any field"
}
```

<br>

#

## DELETE /types/:typeId

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Admin Bearer Token
- User must be an admin to delete a type
- Content-type: application/json
- Empty body

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Type deleted with success"
}
```

<br>

#### Expected Errors:

<br>

**Status 401 - Missing authorization token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token"
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token"
}
```

<br>

**Status 401 - User is not an admin**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User is not an admin"
}
```

<br>

**Status 404 - Type not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Type not found"
}
```

<br>

#
