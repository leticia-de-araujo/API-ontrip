## POST /types

<br>

#### Request:

```
header: {
    authorization: "Bearer Admin token"
}

```

```

body:{
    "name":"room"
}
```

<br>

#### Expected Response:

<br>

**Status - 201**

```
body:{
    "message": "type created",

    "data": {
        "id": "uuid string",
        "name": "room",
    }
}
```

<br>

#### Error Responses:

<br>

**Status - 409 - There's already a type with the same name**

```
body: {
    "status": "Error",
    "code": 409,
    "message": `Type named ${name used in object sent in Request body} already exists`
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

#

## GET /types

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
        "id": "uuid string",
        "name": "room"
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

## GET /types/:id

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
    "id": "uuid string",
    "name": "room"
    }
}
```

<br>

#### Error Responses:

<br>

**Status - 400 - Can't list a field that doesn't exist**

```
body: {
    "status": "Error",
    "code": 400,
    "message": "There's no type associated with this ID"
}
```

<br>

#

## PATCH /types/:id

<br>

#### Request:

```
headers:{
    "authorization": "Bearer Admin Token",
}
```

```
body:{
    "name": "string",
}
```

<br>

#### Expected Responses:

<br>

**Status - 200**

```
body:{
    "message": "Type name updated",

    "data": {
    "id": "uuid string",
    "name": "room",
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

**Status - 403 - Can't edit a field that doesn't exist**

```
body:{
    "status": "Error",
    "code": 403,
    "message": "There's no type associated with this ID"
}
```
