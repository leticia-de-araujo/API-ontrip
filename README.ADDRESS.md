# Address

The Address object is defined as:

| **Field**       | **Type** | **Description**                                  |
| --------------- | -------- | ------------------------------------------------ |
| country         | string   | Defines the country of the address               |
| state           | string   | Defines the state of the address                 |
| city            | string   | Defines the city of the address                  |
| postalCode      | string   | Defines the postal Code of the address           |
| street          | string   | Defines the stret of the address                 |
| complement      | string   | Defines the complement of the address            |
| accommodationId | string   | Accommodation's unique identifier                |

<br>

### **Endpoints**

| **Method** | **Route**               | **Description**                                     |
| ---------- | ----------------------- | --------------------------------------------------- |
| GET        | /address                | List all address                                    |
| GET        | /address/:addressId     | List a unique address                               |
| POST       | /address                | Create a new address                                |
| PATCH      | /address/:addressId     | Updates an address                                  |
| DELETE     | /address/:addressId     | Soft-deletes an address using its ID as a parameter |

<br>


## GET /address

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
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

**Status - 200**

```json
{
    "message": "success",
    "addresses": [
      {
      "id": "4a944707-6c5e-4ea9-a2c8-882196d3904f",
      "country": "Brazil",
      "state": "Espirito Santo",
      "city": "Serra",
      "postalCode": "29163663",
      "street": "Rosemberg",
      "complement": "Quadra 45, Setor Ásia",
      "accommodationId": "661dc120-4851-47ec-8a76-216e8380345e"
      },
    ...
  ]
}
```

<br>

#### Error Responses:

<br>

**Status - 400**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Invalid token"
}
```

<br>

**Status - 401**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token"
}
```

#

## GET /address/:id

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
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

**Status - 200**

```json
{
    "message": "success",
    "address": 
    {      
      "id": "4a944707-6c5e-4ea9-a2c8-882196d3904f",
      "country": "Brazil",
      "state": "Espirito Santo",
      "city": "Serra",
      "postalCode": "29163663",
      "street": "Rosemberg",
      "complement": "Quadra 45, Setor Ásia",
      "accommodationId": "661dc120-4851-47ec-8a76-216e8380345e"
      ,
    }
}
```

<br>

#### Error Responses:

<br>

**Status - 400**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Invalid token"
}
```

<br>

**Status - 404**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Address not found"
}
```

<br>

**Status - 401**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token"
}
```

#

## POST /address

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
    "country": "Brazil",
    "state": "Espirito Santo",
    "city": "Serra",
    "postalCode": "29163663",
    "street": "Rosemberg",
    "complement": "Quadra 45, Setor Ásia",
    "accommodationId": "661dc120-4851-47ec-8a76-216e8380345e"
}
```

<br>

#### Expected Response:

<br>

**Status - 201**

```json
{
    "message": "Address created",
    "address": 
    {
      "id": "4a944707-6c5e-4ea9-a2c8-882196d3904f",
      "country": "Brazil",
      "state": "Espirito Santo",
      "city": "Serra",
      "postalCode": "29163663",
      "street": "Rosemberg",
      "complement": "Quadra 45, Setor Ásia",
      "accommodationId": "661dc120-4851-47ec-8a76-216e8380345e"
    },
}
```

<br>

#### Error Responses:

<br>

**Status - 400**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Invalid token"
}
```

<br>

**Status - 401**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token"
}
```

<br>

**Status - 404**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Accommodation not found"
}
```

<br>

**Status - 400**

```json
{
  "status": "Error",
  "code": 400,
  "message": "(any object key) is a required field"
}
```

<br>

**Status - 400**

```json
{
  "status": "Error",
  "code": 400,
  "message": "(any object key) has an invalid type"
}
```

<br>

**Status - 413**

```json
{
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
    "country": "Brazil",
    "state": "Espirito Santo",
    "city": "Serra",
    "postalCode": "29163663",
    "street": "Rosemberg",
    "complement": "Quadra 45, Setor Ásia",
    "accommodationId": "661dc120-4851-47ec-8a76-216e8380345e"
}
```

<br>

#### Expected Response:

<br>

**Status - 200**

```json
{
    "message": "Address updated",
    "address": 
    {
      "id": "4a944707-6c5e-4ea9-a2c8-882196d3904f",
      "country": "Brazil",
      "state": "Espirito Santo",
      "city": "Serra",
      "postalCode": "29163663",
      "street": "Rosemberg",
      "complement": "Quadra 45, Setor Ásia",
      "accommodationId": "661dc120-4851-47ec-8a76-216e8380345e"
    },
}
```

<br>

#### Error Responses:

<br>

**Status - 400**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Invalid token"
}
```

<br>

**Status - 401**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token"
}
```

<br>

**Status - 400**

```json
{
  "status": "Error",
  "code": 400,
  "message": "(any object key) has an invalid type"
}
```

<br>

**Status - 413**

```json
{
  "status": "Error",
  "code": 413,
  "message": "(object key) length too large"
}
```

<br>

**Status - 404**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Address not found"
}
```

#

## DELETE /address/:id (soft-delete)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
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

**Status - 204**

```json
{
  "message": "Address disabled with success"
}
```

<br>

#### Error Responses:

<br>

**Status - 400**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Invalid token"
}
```

<br>

**Status - 401**

```json
{
  "status": "Error",
  "code": 401,
  "message": "Missing authorization token"
}
```

<br>

**Status - 400**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Address already disabled"
}
```

<br>

**Status - 404**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Address not found"
}
```
