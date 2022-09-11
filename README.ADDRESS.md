# Address

The Address object is defined as:

| **Field**       | **Type** | **Description**                                   |
| --------------- | -------- | ------------------------------------------------- |
| country         | string   | Defines the country of the address                |
| state           | string   | Defines the state of the address                  |
| city            | string   | Defines the city of the address                   |
| postalCode      | string   | Defines the postal Code of the address            |
| street          | string   | Defines the street of the address                 |
| complement      | string   | Defines the complement of the address             |
| accommodationId | string   | Accommodation's unique identifier of this address |

<br>

### **Endpoints**

| **Method** | **Route**           | **Description**                                |
| ---------- | ------------------- | ---------------------------------------------- |
| POST       | /address            | Creates a new address                          |
<!-- | PATCH      | /address/:addressId | Updates an address using its ID as a parameter | -->

<br>

## POST /address

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
- User must be the owner of the accommodation of the new address
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

**Status 201 - Created**

```json
{
  "message": "Address created with success",
  "address": {
    "id": "4a944707-6c5e-4ea9-a2c8-882196d3904f",
    "country": "Brazil",
    "state": "Espirito Santo",
    "city": "Serra",
    "postalCode": "29163663",
    "street": "Rosemberg",
    "complement": "Quadra 45, Setor Ásia",
    "accommodationId": "661dc120-4851-47ec-8a76-216e8380345e"
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

**Status 401 - User is not the accommodation owner**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User must be the owner of the accommodation set at this address"
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

**Status - 404 - Accommodation not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Accommodation not found"
}
```

<br>

**Status 409 - Address already registered in this accommodation**

```json
{
  "status": "Error",
  "code": 409,
  "message": "Address already registered in this accommodation"
}
```

<br>

<!-- Faz sentido ter patch de Address? Pq alguém mudaria o endereço de uma acomodação? O certo não seria criar outra acomodação? -->

<!-- #

## PATCH /address/:id

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
- User must be the accommodation owner or an admin
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

**Status 200 - OK**

```json
{
  "message": "Address updated with success",
  "address": {
    "id": "4a944707-6c5e-4ea9-a2c8-882196d3904f",
    "country": "Brazil",
    "state": "Espirito Santo",
    "city": "Serra",
    "postalCode": "29163663",
    "street": "Rosemberg",
    "complement": "Quadra 45, Setor Ásia",
    "accommodationId": "661dc120-4851-47ec-8a76-216e8380345e"
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
 -->
