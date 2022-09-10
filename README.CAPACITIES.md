# Capacities

The Capacity object is defined as:

| **Field**   | **Type** | **Description**                                |
| ----------- | -------- | ---------------------------------------------- |
| id          | string   | Capacity's unique identifier                   |
| rooms       | number   | Number of capacity rooms                       |
| beds        | number   | Number of capacity beds                        |
| totalGuests | number   | Total number of guests that the capacity hosts |
| bathrooms   | number   | Number of capacity bathrooms                   |
| isActive    | boolean  | Defines whether a capacity is active or not    |

<br>

### **Endpoints**

| **Method** | **Route**               | **Description**                                     |
| ---------- | ----------------------- | --------------------------------------------------- |
| POST       | /capacities             | Creates a capacity                                  |
| GET        | /capacities             | List all capacities                                 |
| GET        | /capacities/:capacityId | Lists a capacity using its ID as a parameter        |
| PATCH      | /capacities/:capacityId | Updates a capacity using its ID as a parameter      |
| DELETE     | /capacities/:capacityId | Soft-deletes a capacity using its ID as a parameter |

<br>

## POST /capacities

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Admin Bearer Token
- User must be an admin to create a capacity
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
  "rooms": 2,
  "beds": 2,
  "totalGuests": 4,
  "bathrooms": 2
}
```

<br>

#### Expected Response:

<br>

**Status 201 - Created**

```json
{
  "message": "Capacity created with success",
  "capacity": {
    "id": "3aa9018f-1415-4caf-a382-07aff5e0076a",
    "rooms": 2,
    "beds": 2,
    "totalGuests": 4,
    "bathrooms": 2,
    "isActive": true
  }
}
```

<br>

#### Error Responses:

<br>

**Status 401 - Missing admin token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing admin token"
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid Token"
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

**Status 409 - This capacity already exists**

```json
{
  "status": "Error",
  "code": 409,
  "message": "This capacity already exists"
}
```

<br>

#

## GET /capacities

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
  "capacities":
  [
    {
      "id": "3aa9018f-1415-4caf-a382-07aff5e0076a",
      "rooms": 2,
      "beds": 2,
      "totalGuests": 4,
      "bathrooms": 2,
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

## GET /capacities/:capacityId

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
  "capacity": {
    "id": "3aa9018f-1415-4caf-a382-07aff5e0076a",
    "rooms": 2,
    "beds": 2,
    "totalGuests": 4,
    "bathrooms": 2,
    "isActive": true
  }
}
```

<br>

#### Error Responses:

<br>

**Status 404 - Capacity not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Capacity not found"
}
```

<br>

#

## PATCH /capacities/:capacityId

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Admin Bearer Token
- User must be an admin to update a capacity
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
  "rooms?": 1,
  "beds?": 1,
  "totalGuests?": 2,
  "bathrooms?": 1
}
```

- At least one field is required

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Capacity updated with success",
  "capacity": {
    "id": "3aa9018f-1415-4caf-a382-07aff5e0076a",
    "rooms": 1,
    "beds": 1,
    "totalGuests": 2,
    "bathrooms": 1,
    "isActive": true
  }
}
```

<br>

#### Expected Errors:

<br>

**Status 401 - Missing admin token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing Admin Token"
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid Token"
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

**Status 404 - Capacity not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Capacity not found"
}
```

<br>

**Status 400 - No changes in capacity data**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Not possible to update a capacity without having any changes in any field"
}
```

<br>

#

## DELETE /capacities/:capacityId

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Admin Bearer Token
- User must be an admin to delete a capacity
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
  "message": "Capacity deleted with success"
}
```

<br>

#### Expected Errors:

<br>

**Status 401 - Missing admin token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing Admin Token"
}
```

<br>

**Status 401 - Invalid token**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Invalid Token"
}
```

<br>

**Status 404 - Capacity not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Capacity not found"
}
```

<br>

#
