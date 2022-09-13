# Booking

The Booking object is defined as:

| **Field**       | **Type** | **Description**                                  |
| --------------- | -------- | ------------------------------------------------ |
| id              | string   | Booking's unique identifier                      |
| checkIn         | string   | Defines the data and time for a chekin           |
| checkout        | string   | Defines the data and time for a checkout         |
| accommodationId | string   | Accommodation's unique identifier                |
| status          | string   | Defines if the booking is "booked" or "canceled" |
| userId          | string   | User's unique idetifier                          |

<br>

### **Endpoints**

| **Method** | **Route**           | **Description**                                    |
| ---------- | ------------------- | -------------------------------------------------- |
| POST       | /booking            | Creates a new booking                              |
| GET        | /booking            | List all bookings                                  |
| GET        | /booking/:bookingId | Lists a booking using its ID as a parameter        |
| DELETE     | /booking/:bookingId | Soft-deletes a booking using its ID as a parameter |

<br>

## POST /booking

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
  "checkIn": "2023/01/12",
  "checkout": "2023/05/12",
  "accommodationId": "402c85e9-46d9-4471-8e33-46954319261a",
  "userId": "17851b8b-a8ea-48ad-98bb-0f2fc86a8459"
}
```

<br>

#### Expected Response:

<br>

**Status 201 - Created**

```json
{
  "message": "Booking created with success",
  "booking": {
    "id": "f4939be7-3790-4f67-97d0-f2c17739d807",
    "checkIn": "2023/01/12",
    "checkout": "2023/05/12",
    "accommodation": "402c85e9-46d9-4471-8e33-46954319261a",
    "status": "booked",
    "user": "17851b8b-a8ea-48ad-98bb-0f2fc86a8459"
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

**Status 409 - Booking already registered**

```json
{
  "status": "Error",
  "code": 409,
  "message": "This booking is already registered"
}
```

<br>

#

## GET /booking

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
- User must be an admin
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

**Status 200 - OK**

```json
{
    "message": "Successful request",
    "bookings": [
      {
          "id": "f4939be7-3790-4f67-97d0-f2c17739d807",
          "checkIn": "2023/01/12",
          "checkout": "2023/05/12",
          "accommodationId": "402c85e9-46d9-4471-8e33-46954319261a",
          "status": "booked",
          "userId": "17851b8b-a8ea-48ad-98bb-0f2fc86a8459"
      },
    ...
    ]
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

**Status 401 - User is not an admin**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User is not an admin"
}
```

<br>

#

## GET /booking/:bookingId

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
- User must be the owner of the accommodation, the guest that booked the booking, or an admin
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

**Status 200 - OK**

```json
{
  "message": "Successful request",
  "booking": {
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

**Status 401 - User is not the owner of the accommodation, the guest that booked the booking, or an admin**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User must be the owner of the accommodation, the guest that booked the booking, or an admin"
}
```

<br>

**Status 404 - Booking not found**

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
- Authorization: Bearer Token
- User must be the owner of the accommodation, the guest that booked the booking, or an admin
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

**Status 200 - OK**

```json
{
  "message": "Booking deleted with success"
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

**Status 401 - User is not the owner of the accommodation, the guest that booked the booking, or an admin**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User must be the owner of the accommodation, the guest that booked the booking, or an admin"
}
```

<br>

**Status 400 - Booking already deleted**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Booking already deleted"
}
```

<br>

**Status 404 - Booking not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Booking not found"
}
```

<br>
