## POST /capabilities

<br>

#### Request:

```
header: {
    authorization: "Bearer Admin token"
}

```

```

body:{
    "rooms": 1
    "beds": 1
    "totalGuests": 1
    "bathrooms": 1
}
```

<br>

#### Expected Response:

<br>

**Status - 201**

```
body:{
    "message": "capacity created",

    "data": {
        "id": " uuid string",
        "rooms": 1
        "beds": 1
        "totalGuests": 1
        "bathrooms": 1
    }
}
```

<br>

#### Error Responses:

<br>

**Status - 403 - There's already a capacity with the same exact data**

```
body: {
    "status": "Error",
    "code": 403,
    "message": `There's already a capacity with the intended data in the database`
}
```

<br>

**Status - 401 - Must have an Admin token in request's header**

```
body: {
    "status": "Error",
    "code": 401,
    "message": "Missing admin token"
}
```

<br>

**Status - 400 - The request data must make sense (no negative values, at least 1 guest capacity)**

```
body: {
    "status": "Error",
    "code": 400,
    "message": "Invalid capacity data (negative values or unreasonable guest capacity)"
}
```

#

## GET /capacities

<br>

#### Request:

```
No body required
```

<br>
<br>

#### Expected Responses:

<br>

**Status - 200**

```
body:{
    "message": "Request sucessful",
    "data": [{
        "id": " uuid string",
        "rooms": 1
        "beds": 1
        "totalGuests": 1
        "bathrooms": 1
    },
    ...
    ]
}
```

<br>

#### Error Responses:

<br>

**No errors expected**

#

## GET /capacities/:id

<br>

#### Request:

```
No body required
```

<br>
<br>

#### Expected Responses:

<br>

**Status - 200**

```
body:{
    "message": "Request sucessful",
    "data": {
        "id": " uuid string",
        "rooms": 1
        "beds": 1
        "totalGuests": 1
        "bathrooms": 1
    }
}
```

<br>

#### Error Responses:

<br>

**Status - 404 - Can't list a field that doesn't exist**

```
body: {
    "status": "Error",
    "code": 404,
    "message": "There's no capacity associated with the Id used"
}
```

<br>

#

## PATCH /capacities/:id

<br>

#### Request:

```
headers:{
    "authorization": "Bearer Admin Token",
}
```

```
body:{
    "rooms": 1
    "beds": 1
    "totalGuests": 1
    "bathrooms": 1,
}
```

<br>

#### Expected Responses:

<br>

**Status - 200**

```
body:{
    "message": "Capacity updated",

    "data": {
        "id": "string",
        "rooms": 1
        "beds": 1
        "totalGuests": 1
        "bathrooms": 1,
    }
}
```

<br>

#### Expected Errors:

<br>

**Status - 401 - Must have an Admin token in request's header**

```
body:{
    "status": "Error",
    "code": 401,
    "message": "Admin token required"
}
```

**Status - 404 - Can't edit a field that doesn't exist**

```
body:{
    "status": "Error",
    "code": 404,
    "message": "There's no capacity associated with this Id"
}
```

**Status - 400 - The request data must make sense (no negative values, at least 1 guest capacity)**

```
body:{
    "status": "Error",
    "code": 403,
    "message": "Invalid capacity data (negative values or unreasonable guest capacity)"
}
```

<br>

**Status - 403 - There's already a capacity with the same exact data**

```
body: {
    "status": "Error",
    "code": 403,
    "message": `There's already a capacity with the intended data in the database`
}
```
