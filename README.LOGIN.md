# Login

The Login object is defined as:

| **Field** | **Type** | **Description** |
| --------- | -------- | --------------- |
| email     | string   | User email      |
| password  | string   | User password   |

<br>

### **Endpoints**

| **Method** | **Route** | **Description** |
| ---------- | --------- | --------------- |
| POST       | /login    | Login user      |

<br>

## POST /login

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: None
- Content-type: application/json

**Request body example**

```json
{
  "email": "bobspencer@email.com",
  "password": "874aS4A6F65i"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Login sucessfull",
  "token": "yJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2MjY4ODU1OCwiaWF0IjoxNjYyNjg4NTU4fQ.OONsla408_ohD5XE9b3-qfWaniZC95pgyBetmJeKViA"
}
```

<br>

#### Error Responses:

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

**Status 400 - Required field with invalid type**

```json
{
  "status": "Error",
  "code": 400,
  "message": "(any object key) has an invalid type"
}
```

<br>

**Status 413 - Required field length too large**

```json
{
  "status": "Error",
  "code": 413,
  "message": "(object key) length too large"
}
```

<br>

**Status 404 - User not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "User not found"
}
```

<br>

#
