## GET /address

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
      "id": "uuid",
      "country": "example",
      "state": "example state",
      "city": "example city",
      "postalCode": "28830418",
      "street": "street example",
      "complement": "near from example",
      "accommodation": "uuid accomodation"
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

## GET /address/:id

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
      "id": "uuid",
      "country": "example",
      "state": "example state",
      "city": "example city",
      "postalCode": "28830418",
      "street": "street example",
      "complement": "near from example",
      "accommodation": "uuid accomodation"
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
"message": "Address not found"
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

## POST /address

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
    {
      "country": "example",
      "state": "example state",
      "city": "example city",
      "postalCode": "28830418",
      "street": "street example",
      "complement": "near from example",
      "accommodation": "uuid accomodation"
    },
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
      {
      "id": "uuid",
      "country": "example",
      "state": "example state",
      "city": "example city",
      "postalCode": "28830418",
      "street": "street example",
      "complement": "near from example",
      "accommodation": "uuid accomodation"
      },
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

#

## PATCH /address/:id

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
    "country": "example",
    "state": "example state",
    "city": "example city",
    "postalCode": "28830418",
    "street": "street example",
    "complement": "near from example",
    "accommodation": "uuid accomodation"
  },
}
```

<br>

#### Expected Response:

<br>

**Status - 200**

```
body:
  {
    "message": "success",
    "data": {
      {
      "id": "uuid",
      "country": "example",
      "state": "example state",
      "city": "example city",
      "postalCode": "28830418",
      "street": "street example",
      "complement": "near from example",
      "accommodation": "uuid accomodation"
      },
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

**Status - 404**

```
body: {
"status": "Error",
"code": 404,
"message": "Address not found"
}
```

#

## DELETE /address/:id (soft-delete)

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
"message": "Address disabled with success"
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
"message": "Address already disabled"
}
```

<br>

**Status - 404**

```
body: {
"status": "Error",
"code": 404,
"message": "Address not found"
}
```
