# Capacities

## POST /capacities

<br>

#### Request:

- Authorization: Bearer Token
- Content-type: application/json

<br>

```
headers: {
  "authorization": "Bearer token"
}
```

```
body: {
    "rooms": number,
    "beds": number,
    "totalGuests": number,
    "bathrooms": number,
}
```

<br>

#### Expected Response:

<br>

**Status - 201**

```
body:{
  "message": "Capacity created with success",
  "data": {
    "id": "string",
    "rooms": number
    "beds": number
    "totalGuests": number
    "bathrooms": number
  }
}
```

<br>

#### Error Responses:

<br>

**Status - 401 - Missing admin token**

```
body: {
  "status": "Error",
  "code": 401,
  "message": "Missing admin token"
}
```

<br>

**Status - 401 - Invalid Token**

```
body: {
  "status": "Error",
  "code": 401,
  "message": "Invalid token"
}
```

<br>

**Status - 403 - There's already a capacity with the same exact data**

```
body: {
  "status": "Error",
  "code": 403,
  "message": "There's already a capacity with the intended data in the database"
}
```

<br>

**Status - 400 - Invalid capacity data (negative values or unreasonable guest capacity)**

```
body: {
  "status": "Error",
  "code": 400,
  "message": "Invalid capacity data (negative values or unreasonable guest capacity)"
}
```

#

## GET /capacities

<br>

#### Request:

- Authorization: None
- Content-type: application/json
- Empty body

<br>

#### Expected Response:

<br>

**Status - 200**

```
body: {
  "message": "Successful request",
  "data": [
    {
      "id": "string",
      "rooms": number,
      "beds": number,
      "totalGuests": number,
      "bathrooms": number,
    },
    ...
  ]
}
```

<br>

#### Error Responses:

<br>

**No errors expected**

#

## GET /capacities/:id

<br>

#### Request:

- Authorization: Bearer Token
- Content-type: application/json
- Empty body

<br>

```
headers: {
  "authorization": "Bearer token"
}
```

<br>

#### Expected Response:

<br>

**Status - 200**

```
body: {
  "message": "Successful request",
  "data": {
    "id": "string",
    "rooms": number,
    "beds": number,
    "totalGuests": number,
    "bathrooms": number,
  }
}
```

<br>

#### Error Responses:

<br>

**Status - 404 - Capacity not found**

```
body: {
  "status": "Error",
  "code": 404,
  "message": "Capacity not found"
}
```

<br>

#

## PATCH /capacities/:id

<br>

#### Request:

- Authorization: Bearer Token
- Content-type: application/json

<br>

```
headers: {
  "authorization": "Bearer token"
}
```

```
body: {
  "rooms": number
  "beds": number
  "totalGuests": number
  "bathrooms": number,
}
```

<br>

#### Expected Response:

<br>

**Status - 200**

```
body: {
  "message": "Capacity updated with success",
  "data": {
    "id": "string",
    "rooms": number,
    "beds": number,
    "totalGuests": number,
    "bathrooms": number,
  }
}
```

<br>

#### Expected Errors:

<br>

**Status - 401 - Missing admin token**

```
body: {
  "status": "Error",
  "code": 401,
  "message": "Missing admin token",
}
```

**Status - 404 - Capacity not found**

```
body: {
  "status": "Error",
  "code": 404,
  "message": "Capacity not found",
}
```

**Status - 400 - The request data must make sense (no negative values, at least 1 guest capacity)**

```
body: {
  "status": "Error",
  "code": 403,
  "message": "Invalid capacity data (negative values or unreasonable guest capacity)"
}
```

<br>

**Status - 400 - No changes in capacity data**

```
body: {
  "status": "Error",
  "code": 400,
  "message": "Not possible to update a capacity without having any changes in any field",
}
```
