# Categories

The Category object is defined as:

| **Field** | **Type** | **Description**                             |
| --------- | -------- | ------------------------------------------- |
| id        | string   | Category's unique identifier                |
| name      | string   | Category name                               |
| isActive  | boolean  | Defines whether a category is active or not |

<br>

### **Endpoints**

| **Method** | **Route**               | **Description**                                     |
| ---------- | ----------------------- | --------------------------------------------------- |
| POST       | /categories             | Creates a category                                  |
| GET        | /categories             | List all categories                                 |
| GET        | /categories/:categoryId | Lists a category using its ID as a parameter        |
| PATCH      | /categories/:categoryId | Updates a category using its ID as a parameter      |
| DELETE     | /categories/:categoryId | Soft-deletes a category using its ID as a parameter |

<br>

## POST /categories

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Admin Bearer Token
- User must be an admin to create a category
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
  "name": "Apartment"
}
```

<br>

#### Expected Response:

<br>

**Status 201 - Created**

```json
{
  "message": "Category created with success",
  "category": {
    "id": "fc540668-a80c-4690-8889-1c89c5a51b5c",
    "name": "Apartment",
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

**Status 409 - This category already exists**

```json
{
  "status": "Error",
  "code": 409,
  "message": "This category already exists"
}
```

<br>

#

## GET /categories

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
  "categories":
  [
    {
      "id": "fc540668-a80c-4690-8889-1c89c5a51b5c",
      "name": "Apartment",
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

## GET /categories/:categoryId

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
  "category": {
    "id": "fc540668-a80c-4690-8889-1c89c5a51b5c",
    "name": "Apartment",
    "isActive": true
  }
}
```

<br>

#### Error Responses:

<br>

**Status - 404 - Category not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Category not found"
}
```

<br>

#

## PATCH /categories/:categoryId

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Admin Bearer Token
- User must be an admin to update a category
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
  "name": "Studio"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Category updated with success",
  "category": {
    "id": "fc540668-a80c-4690-8889-1c89c5a51b5c",
    "name": "Studio",
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

**Status 404 - Category not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Category not found"
}
```

<br>

**Status 400 - No changes in category data**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Not possible to update a category without having any changes in any field"
}
```

<br>

#

## DELETE /categories/:categoryId

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Admin Bearer Token
- User must be an admin to delete a category
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
  "message": "Category deleted with success"
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

**Status 404 - Category not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Category not found"
}
```

<br>

#
