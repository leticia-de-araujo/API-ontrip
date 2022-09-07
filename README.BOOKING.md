## POST /booking

<br>

#### Request:

```
body:{
    "checkIn": "string",
    "checkout": "string",
    "accommodationId": "string",
    "status": "string",
    "userId": "string"
}
```

<br>

#### Expected Response:

<br>

**Status - 201**


```
body:{

    "message": "Booking created",

    "data":{
        "id": "string",
        "checkIn": "string",
        "checkout": "string",
        "accommodationId": "string",
        "status": "string",
        "userId": "string"
    }
}
```

<br>

#### Error Responses:

<br>

**Status - 409**

```
body: {
"status": "Error",
"code": 409,
"message": "Booking already exists"
}
```

<br>

**Status - 400**

```
body: {
"status": "Error",
"code": 400,
"message": "Please send all informations"
}
```

<br>

**Status - 403**

```
body: {
"status": "Error",
"code": 403,
"message": "User has no authorization"
}
```

<br>

**Status - 401**

```
body: {
"status": "Error",
"code": 401,
"message": "User has no authentication"
}
```

#

## POST /booking/:bookingId

<br>

#### Request:

```
body:{
    "checkIn": "string",
    "checkout": "string",
    "status": "string",
}
```

<br>

#### Expected Response:

<br>

```
body:{

    "message": "Booking updated",

    "data":{
        "id": "string",
        "checkIn": "string",
        "checkout": "string",
        "status": "string",
    }
}
```