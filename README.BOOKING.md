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