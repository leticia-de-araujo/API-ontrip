# Accommodations

## POST /accommodations

<br>

#### Request:

- Authorization: Bearer Token
- Content-type: application/json

<br>

```
header: {
  "authorization": "Bearer token"
}
```

```
body: {
  "name": "string",
  "description": "string",
  "dailyPrice": number,
  "typeId": "string",
  "userId": "string",
  "capacityId": "string",
  "categoryId": "string",
}
```

<br>

#### Expected Response:

<br>

**Status - 201**

```
body: {
  "message": "Accommodation Created",
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "dailyPrice": number,
    "isActive": true,
    "verifiedByAdm": false,
    "specialOffer": false,
    "type": {
      "name": "string"
    }
    "user": {
      "userName": "string",
      "email": "string",
      "dateOfBirth": "yyyy/mm/dd",
      "isAdm": false,
      "isActive": true,
      "photo": "string-base64"
    },
    "capacity": {
        "rooms": number,
        "beds": number,
        "totalGuests": number,
        "bathrooms": number
      },
    "category": {
      "name": "string"
    },
  }
}
```

<br>

#### Error Responses:

<br>

**Status - 401 - Missing authorization token**

```
body: {
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token"
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

**Status - 400 - Missing required field**

```
body: {
  "status": "Error",
  "code": 400,
  "message": "(any object key) is a required field"
}
```

<br>

**Status - 400 - Required field with invalid type**

```
body: {
  "status": "Error",
  "code": 400,
  "message": "(any object key) has an invalid type"
}
```

<br>

**Status - 413 - Required field length too large**

```
body: {
  "status": "Error",
  "code": 413,
  "message": "(object key) length too large"
}
```

<br>

**Status - 409 - Accommodation already registered**

```
body: {
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

**Status - 200**

```
body: [
  {
    "message": "Success",
    "data": {
      "id": "string",
      "name": "string",
      "description": "string",
      "dailyPrice": number,
      "isActive": true,
      "verifiedByAdm": false,
      "specialOffer": false,
      "type": {
        "name": "string"
      }
      "user": {
        "userName": "string",
        "email": "string",
        "dateOfBirth": "yyyy/mm/dd",
        "isAdm": false,
        "isActive": true,
        "photo": "string-base64"
      },
      "capacity": {
        "rooms": number,
        "beds": number,
        "totalGuests": number,
        "bathrooms": number
      },
      "category": {
        "name": "string"
      },
    }
  }
  ...
]
```

<br>

#### Error Responses:

- No error expected

#

## GET /accommodations/:id

<br>

#### Request:

- Authorization: Bearer Token
- Content-type: application/json
- Empty body

<br>

```
header: {
  "authorization": "Bearer token"
}
```

<br>

#### Expected Response:

**Status - 200**

```
body: {
  "message": "Success",
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "dailyPrice": number,
    "isActive": true,
    "verifiedByAdm": false,
    "specialOffer": false,
    "type": {
      "name": "string"
    }
    "user": {
      "userName": "string",
      "email": "string",
      "dateOfBirth": "yyyy/mm/dd",
      "isAdm": false,
      "isActive": true,
      "photo": "string-base64"
    },
    "capacity": {
      "rooms": number,
      "beds": number,
      "totalGuests": number,
      "bathrooms": number
    },
    "category": {
      "name": "string"
    },
  }
}
```

<br>

#### Error Responses:

<br>

**Status - 401 - Missing authorization token**

```
body: {
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token"
}
```

<br>

**Status - 401 - Invalid token**

```
body: {
  "status": "Error",
  "code": 401,
  "message": "Invalid token"
}
```

<br>

**Status - 404 - Accommodation not found**

```
body: {
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

```
header: {
  "authorization": "Bearer token"
}
```

```
body: {
  "id": "string",
  "name": "string",
  "description": "string",
  "dailyPrice": number,
  "isActive": true,
  "verifiedByAdm": false,
  "specialOffer": false,
  "typeId": "string",
  "userId": "string",
  "capacityId": "string",
  "categoryId": "string",
}
```

<br>

#### Expected Response:

<br>

**Status - 200**

```
body: {
  "message": "Success",
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "dailyPrice": number,
    "isActive": true,
    "verifiedByAdm": false,
    "specialOffer": false,
    "type": {
      "name": "string"
    }
    "user": {
      "userName": "string",
      "email": "string",
      "dateOfBirth": "yyyy/mm/dd",
      "isAdm": false,
      "isActive": true,
      "photo": "string-base64"
    },
    "capacity": {
        "rooms": number,
        "beds": number,
        "totalGuests": number,
        "bathrooms": number
      },
    "category": {
      "name": "string"
    },
  }
}
```

<br>

#### Error Responses:

<br>

**Status - 401 - Missing authorization token**

```
body: {
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token"
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

**Status - 400 - Field with invalid type**

```
body: {
  "status": "Error",
  "code": 400,
  "message": "(any object key) has an invalid type"
}
```

<br>

**Status - 413 - Field length too large**

```
body: {
  "status": "Error",
  "code": 413,
  "message": "(object key) length too large"
}
```

<br>

**Status - 409 - Accommodation already registered**

```
body: {
  "status": "Error",
  "code": 409,
  "message": "This accommodation is already registered"
}
```

<br>

**Status - 404 - Accommodation not found**

```
body: {
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

```
header: {
  "authorization": "Bearer token"
}
```

<br>

#### Expected Response:

<br>

**Status - 204**

```
body: {
  "message": "Accommodation deleted with success"
}
```

<br>

#### Error Responses:

<br>

**Status - 401 - Missing authorization token**

```
body: {
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token"
}
```

<br>

**Status - 401 - Invalid token**

```
body: {
  "status": "Error",
  "code": 401,
  "message": "Invalid token"
}
```

<br>

**Status - 400 - Accommodation already deleted**

```
body: {
  "status": "Error",
  "code": 400,
  "message": "Accommodation already deleted"
}
```

<br>

**Status - 404 - Accommodation not found**

```
body: {
  "status": "Error",
  "code": 404,
  "message": "Accommodation not found"
}
```
