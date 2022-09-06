## GET /accommodation

<br>

#### Request:

```
header: {
    authorization: "Bearer token"
}
```

<br>

#### Expected Response:

<br>

**Status - 200**

```
body:
[
    "message": "success",
    data: {
      {
      "name": "example",
      "description": "example description",
      "dailyPrice": 1460,99,
      "isActive": true,
      "verifiedByAdm": false,
      "specialOffer": false,
      "type": {
        "name": "type name"
        }
      "user": {
        "userName": "Example Jr.",
        "email": "example@email.com",
        "password": "example123",
        "dateOfBirth": "yyyy/mm/dd",
        "isAdm": false,
        "isActive": true,
        "photo": "string-base64"
        },
      "capacity": {
        "rooms": 4,
        "beds": 6,
        "totalGuests": 7,
        "bathrooms": 3
        },
      "category": {
        "name": "Apartment"
        }
      },

    ...
  }

]
```

<br>

#### Error Responses:

<br>

**Status - 400**

```
body: {
"status": "Error",
"code": 400,
"message": "Invalid token"
}
```

<br>

**Status - 401**

```
body: {
"status": "Error",
"code": 401,
"message": "Missing authorization token"
}
```

#

## GET /accommodation/:id

<br>

#### Request:

<br>

```
header: {
authorization: "Bearer token"
}
```

<br>

#### Expected Response:

**Status - 200**

```
body:
    "message": "success",
    data: {
    {
      "name": "example",
      "description": "example description",
      "dailyPrice": 1460,99,
      "isActive": true,
      "verifiedByAdm": false,
      "specialOffer": false,
      "type": {
        "name": "type name"
        }
      "user": {
        "userName": "Example Jr.",
        "email": "example@email.com",
        "password": "example123",
        "dateOfBirth": "yyyy/mm/dd",
        "isAdm": false,
        "isActive": true,
        "photo": "string-base64"
        },
      "capacity": {
        "rooms": 4,
        "beds": 6,
        "totalGuests": 7,
        "bathrooms": 3
        },
      "category": {
        "name": "Apartment"
        },
      }
    }
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
"message": "Invalid token"
}
```

<br>

**Status - 404**

```
body: {
"status": "Error",
"code": 404,
"message": "Accommodation not found"
}
```

<br>

**Status - 401**

```
body: {
"status": "Error",
"code": 401,
"message": "Missing authorization token"
}
```

#

## POST /accommodation

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
  {
    "name": "example",
    "description": "example description",
    "dailyPrice": 1460,99,
    "isActive": true,
    "verifiedByAdm": false,
    "specialOffer": false,
    "typeId": "type Id",
    "userId": "user Id",
    "capacityId": "capacity Id",
    "categoryId": "category Id",
  }
}
```

<br>

#### Expected Response:

<br>

**Status - 201**

```
body:
{
    "message": "success",
    "data": {
      "name": "example",
      "description": "example description",
      "dailyPrice": 1460,99,
      "isActive": true,
      "verifiedByAdm": false,
      "specialOffer": false,
      "type": {
        "name": "type name"
        }
      "user": {
        "userName": "Example Jr.",
        "email": "example@email.com",
        "password": "example123",
        "dateOfBirth": "yyyy/mm/dd",
        "isAdm": false,
        "isActive": true,
        "photo": "string-base64"
        }
      }
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
"message": "Invalid token"
}
```

<br>

**Status - 401**

```
body: {
"status": "Error",
"code": 401,
"message": "Missing authorization token"
}
```

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

**Status - 409**

```
body: {
"status": "Error",
"code": 409,
"message": "This Accommodation already exists"
}
```

<br>

#

## PATCH /accommodation/:id

<br>

#### Request:

<br>

```
header: {
authorization: "Bearer token"
}
```

```
body:
{
    {
      "name": "example",
      "description": "example description",
      "dailyPrice": 1460,99,
      "isActive": true,
      "verifiedByAdm": false,
      "specialOffer": false,
      "typeId": "type Id",
      "userId": "user Id",
      "capacityId": "capacity Id",
      "categoryId": "category Id",
    }
}
```

<br>

#### Expected Response:

<br>

**Status - 200**

```
body:
    "message": "success",

    "data": {
      "name": "example",
      "description": "example description",
      "dailyPrice": 1460,99,
      "isActive": true,
      "verifiedByAdm": false,
      "specialOffer": false,
      "type": {
        "name": "type name"
        }
      "user": {
        "userName": "Example Jr.",
        "email": "example@email.com",
        "password": "example123",
        "dateOfBirth": "yyyy/mm/dd",
        "isAdm": false,
        "isActive": true,
        "photo": "string-base64"
        }
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
"message": "Invalid token"
}
```

<br>

**Status - 401**

```
body: {
"status": "Error",
"code": 401,
"message": "Missing authorization token"
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

**Status - 409**

```
body: {
"status": "Error",
"code": 409,
"message": "This Accommodation already exists"
}
```

<br>

**Status - 404**

```
body: {
"status": "Error",
"code": 404,
"message": "Accommodation not found"
}
```

#

## DELETE /accommodation/:id (soft-delete)

<br>

#### Request:

```
header: {
authorization: "Bearer token"
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

**Status - 400**

```
body: {
"status": "Error",
"code": 400,
"message": "Invalid token"
}
```

<br>

**Status - 401**

```
body: {
"status": "Error",
"code": 401,
"message": "Missing authorization token"
}
```

<br>

**Status - 400**

```
body: {
"status": "Error",
"code": 400,
"message": "Accommodation already deleted"
}
```

<br>

**Status - 404**

```
body: {
"status": "Error",
"code": 404,
"message": "Accommodation not found"
}
```
