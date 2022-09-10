# Accommodations

The Accommodation object is defined as:

| **Field**     | **Type** | **Description**                                                          |
| ------------- | -------- | ------------------------------------------------------------------------ |
| id            | string   | Accommodation's unique identifier                                        |
| name          | string   | Accommodation name                                                       |
| description   | string   | Accommodation description                                                |
| dailyPrice    | number   | Daily price for accommodation                                            |
| isActive      | boolean  | Defines whether the accommodation is active or not                       |
| verifiedByAdm | boolean  | Defines whether the accommodation is verified by an administrator or not |
| specialOffer  | boolean  | Defines whether the accommodation has a special offer or not             |
| user          | object   | User who owns the accommodation                                          |
| type          | object   | Accommodation type                                                       |
| capacity      | object   | Accommodation capacity                                                   |
| category      | object   | Accommodation category                                                   |

<br>

### **Endpoints**

| **Method** | **Route**           | **Description**                                           |
| ---------- | ------------------- | --------------------------------------------------------- |
| POST       | /accommodations     | Creates an accommodation                                  |
| GET        | /accommodations     | List all accommodations                                   |
| GET        | /accommodations/:id | Lists an accommodation using its ID as a parameter        |
| PATCH      | /accommodations/:id | Updates an accommodation using its ID as a parameter      |
| DELETE     | /accommodations/:id | Soft-deletes an accommodation using its ID as a parameter |

<br>

## POST /accommodations

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
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
  "name": "Complete apartment to work",
  "description": "Ideal apartment to work remotely, quiet, comfortable, and with all the requirements for a perfect home office.",
  "dailyPrice": 450,
  "typeId": "6e79c2b7-c479-46e3-aeac-b9f62739799e",
  "userId": "04506439-de18-4700-9175-1876e0ed8c34",
  "capacityId": "0b327321-603d-45a7-b4cd-525c11c14b04",
  "categoryId": "d3b5f8db-a292-46b4-ae69-7821c2789dcd"
}
```

<br>

#### Expected Response:

<br>

**Status 201 - Created**

```json
{
  "message": "Accommodation created with success",
  "accommodation": {
    "id": "90ee8282-af60-4570-9847-fb99d5555355",
    "name": "Complete apartment to work",
    "description": "Ideal apartment to work remotely, quiet, comfortable, and with all the requirements for a perfect home office.",
    "dailyPrice": 450,
    "isActive": true,
    "verifiedByAdm": false,
    "specialOffer": false,
    "type": {
      "name": "A whole place"
    },
    "user": {
      "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
      "username": "Bob Spencer",
      "email": "bobspencer@email.com",
      "dateOfBirth": "14/03/1993",
      "photo": "L2dvYWwgbW9yZJShu54j98vgSD79",
      "isAdm": false,
      "isActive": true
    },
    "capacity": {
      "rooms": 2,
      "beds": 2,
      "totalGuests": 4,
      "bathrooms": 2
    },
    "category": {
      "name": "Apartment"
    }
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

**Status 401 - Invalid Token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token"
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

**Status 413 - Data length too larger**

```json
{
  "status": "Error",
  "code": 413,
  "message": "(object key) length too large"
}
```

<br>

**Status 409 - Accommodation already registered**

```json
{
  "status": "Error",
  "code": 409,
  "message": "This accommodation is already registered"
}
```

<br>

#

## GET /accommodations

<br>

#### Request:

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
  "accommodations": [
    {
      "id": "90ee8282-af60-4570-9847-fb99d5555355",
      "name": "Complete apartment to work",
      "description": "Ideal apartment to work remotely, quiet, comfortable, and with all the requirements for a perfect home office.",
      "dailyPrice": 450,
      "isActive": true,
      "verifiedByAdm": false,
      "specialOffer": false,
      "type": {
        "name": "A whole place"
      },
      "user": {
        "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
        "username": "Bob Spencer",
        "email": "bobspencer@email.com",
        "dateOfBirth": "14/03/1993",
        "photo": "L2dvYWwgbW9yZJShu54j98vgSD79",
        "isAdm": false,
        "isActive": true
      },
      "capacity": {
        "rooms": 2,
        "beds": 2,
        "totalGuests": 4,
        "bathrooms": 2
      },
      "category": {
        "name": "Apartment"
      }
    },
    ...
  ]
}


```

<br>

#### Error Responses:

- No errors expected

#

## GET /accommodations/:id

<br>

#### Request:

- Authorization: Bearer Token
- Content-type: application/json
- Empty body

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

#### Expected Response:

**Status 200 - OK**

```json
{
  "message": "Successful request",
  "accommodation": {
    "id": "90ee8282-af60-4570-9847-fb99d5555355",
    "name": "Complete apartment to work",
    "description": "Ideal apartment to work remotely, quiet, comfortable, and with all the requirements for a perfect home office.",
    "dailyPrice": 450,
    "isActive": true,
    "verifiedByAdm": false,
    "specialOffer": false,
    "type": {
      "name": "A whole place"
    },
    "user": {
      "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
      "username": "Bob Spencer",
      "email": "bobspencer@email.com",
      "dateOfBirth": "14/03/1993",
      "photo": "L2dvYWwgbW9yZJShu54j98vgSD79",
      "isAdm": false,
      "isActive": true
    },
    "capacity": {
      "rooms": 2,
      "beds": 2,
      "totalGuests": 4,
      "bathrooms": 2
    },
    "category": {
      "name": "Apartment"
    }
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

**Status - 404 - Accommodation not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Accommodation not found"
}
```

<br>

#

## PATCH /accommodations/:id

<br>

#### Request:

- Authorization: Bearer Token
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
  "dailyPrice": 300,
  "specialOffer": true
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Accommodation updated with success",
  "accommodation": {
    "id": "90ee8282-af60-4570-9847-fb99d5555355",
    "name": "Complete apartment to work",
    "description": "Ideal apartment to work remotely, quiet, comfortable, and with all the requirements for a perfect home office.",
    "dailyPrice": 300,
    "isActive": true,
    "verifiedByAdm": false,
    "specialOffer": true,
    "type": {
      "name": "A whole place"
    },
    "user": {
      "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
      "username": "Bob Spencer",
      "email": "bobspencer@email.com",
      "dateOfBirth": "14/03/1993",
      "photo": "L2dvYWwgbW9yZJShu54j98vgSD79",
      "isAdm": false,
      "isActive": true
    },
    "capacity": {
      "rooms": 2,
      "beds": 2,
      "totalGuests": 4,
      "bathrooms": 2
    },
    "category": {
      "name": "Apartment"
    }
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

**Status 401 - Invalid Token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid token"
}
```

<br>

**Status 401 - User is not the accommodation owner or an admin**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Not possible to non-admin users to update an accommodation without being the owner"
}
```

<br>

**Status 400 - Invalid data**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Invalid data"
}
```

<br>

**Status 413 - Data length too large**

```json
{
  "status": "Error",
  "code": 413,
  "message": "Data length too large"
}
```

<br>

**Status 400 - No changes in accommodation data**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Not possible to update an accommodation without having any changes in any field"
}
```

<br>

**Status 404 - Accommodation not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Accommodation not found"
}
```

#

## DELETE /accommodations/:id (soft-delete)

<br>

#### Request:

- Authorization: Bearer Token
- Content-type: application/json
- Empty body

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

#### Expected Response:

<br>

**Status 204 - No Content**

```json
{
  "message": "Accommodation deleted with success"
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

**Status 401 - User is not the accommodation owner or an admin**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Not possible to non-admin users to delete an accommodation without being the owner"
}
```

<br>

**Status 400 - Accommodation already deleted**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Accommodation already deleted"
}
```

<br>

**Status 404 - Accommodation not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Accommodation not found"
}
```

<br>

#
