# Booking

The Booking object is defined as:

| **Field**      | **Type** | **Description**                                 |
| -------------- | -------- | ----------------------------------------------- |
| id             | string   | Booking's unique identifier                     |
| checkIn        | string   | Defines the data and time for a chekin          |
| checkout       | string   | Defines the data and time for a checkout        |
| accomodationId | string   | Accommodation unique identifier                 |
| status         | string   | Defines if the booking is "booked" or "canceled |
| userId         | string   | User unique idetifier                           |

<br>

### **Endpoints**

| **Method** | **Route**               | **Description**                                     |
| ---------- | ----------------------- | --------------------------------------------------- |
| POST       | /booking                | Creates a new bookint                               |
| GET        | /booking                | List all bookings                                   |
| GET        | /booking/:bookingId     | Lists a bookin using its ID as a parameter          |
| DELETE     | /booking/:bookingId     | Soft-deletes a booking using its ID as a parameter  |

<br>

## POST /booking

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: User or Admin Bearer Token
- User must be an user or admin to create a booking
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
    "checkIn": "2023/01/12",
    "checkout": "2023/05/12",
    "accommodationId": "402c85e9-46d9-4471-8e33-46954319261a",
    "userId": "17851b8b-a8ea-48ad-98bb-0f2fc86a8459"
}
```

<br>

#### Expected Response:

<br>

**Status - 201**

```json
{

    "message": "Booking created",
    "booking":{
        "id": "f4939be7-3790-4f67-97d0-f2c17739d807",
        "checkIn": "2023/01/12",
        "checkout": "2023/05/12",
        "accommodationId": "402c85e9-46d9-4471-8e33-46954319261a",
        "status": "booked",
        "userId": "17851b8b-a8ea-48ad-98bb-0f2fc86a8459"
    }
}
```

<br>

#### Error Responses:

<br>

**Status - 409**

```json
{
    "status": "Error",
    "code": 409,
    "message": "Booking already exists"
}
```

<br>

**Status - 400**

```json
{
    "status": "Error",
    "code": 400,
    "message": "Please send all informations"
}
```

<br>

**Status - 403**

```json
{
    "status": "Error",
    "code": 403,
    "message": "User has no authorization"
}
```

<br>

**Status - 401**

```json
{
    "status": "Error",
    "code": 401,
    "message": "Missing user token"
}
```

#

## GET /booking

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: User or Admin Bearer Token
- User must be an user or admin to list all bookings
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

```
    no body needed
```

<br>

#### Expected Response:

<br>

**Status - 200**

```json
{
    "message": "Success",

    "bookings": {
        "id": "f4939be7-3790-4f67-97d0-f2c17739d807",
        "checkIn": "2023/01/12",
        "checkout": "2023/05/12",
        "accommodationId": "402c85e9-46d9-4471-8e33-46954319261a",
        "status": "booked",
        "userId": "17851b8b-a8ea-48ad-98bb-0f2fc86a8459"
  },
    ...
}
```

<br>

#### Error Responses:

<br>

**Status - 401**

```json
{
    "status": "Error",
    "code": 401,
    "message": "Invalid token"
}
```

<br>

#

## GET /booking/:bookingId

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: User or Admin Bearer Token
- User must be an user or admin to list a booking
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

```
    no body needed
```

<br>

#### Expected Response:

<br>

**Status - 200**

```json
{
    "message": "Success",

    "booking": {
        "id": "f4939be7-3790-4f67-97d0-f2c17739d807",
        "checkIn": "2023/01/12",
        "checkout": "2023/05/12",
        "accommodationId": "402c85e9-46d9-4471-8e33-46954319261a",
        "status": "booked",
        "userId": "17851b8b-a8ea-48ad-98bb-0f2fc86a8459"
  },
}
```

<br>

#### Error Responses:

<br>

**Status - 401**

```json
{
    "status": "Error",
    "code": 401,
    "message": "Invalid token"
}
```

<br>

**Status - 404**

```json
{
    "status": "Error",
    "code": 404,
    "message": "Booking not found"
}
```

<br>

#

## DELETE /booking/:bookingId

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: User or Admin Bearer Token
- User must be an user or admin to soft-delete a booking
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

```
    no body needed
```

<br>

#### Expected Response:

<br>

**Status - 200**

```json
{
    "message": "Booking deleted with success!"
}
```

<br>

#### Error Responses:

<br>

**Status - 401**

```json
{
    "status": "Error",
    "code": 401,
    "message": "Invalid token"
}
```

<br>

**Status - 404**

```json
{
    "status": "Error",
    "code": 404,
    "message": "Booking not found"
}
```

<br>
