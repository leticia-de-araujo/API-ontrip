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