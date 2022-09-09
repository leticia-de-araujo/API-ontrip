## POST /categories

<br>

#### Request:

```
header: {
    authorization: "Bearer Admin token"
}

```

```

body:{
    "name":"apartment"
}
```

<br>

#### Expected Response:

<br>

**Status - 201**

```
body:{
    "message": "category created",

    "data": {
        "id": " uuid string",
    "name": "apartment",
    }
}
```

<br>

#### Error Responses:

<br>

**Status - 409 - There's already a category with the same name**

```
body: {
    "status": "Error",
    "code": 409,
    "message": `Category named ${name used in object sent in Request body} already exists`
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

## GET /categories

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
        "name": "apartment"
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

## GET /categories/:id

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
        "name": "apartment"
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
    "message": "There's no category associated with the Id used"
}
```

<br>

#

## PATCH /categories/:id

<br>

#### Request:

```
headers:{
    "authorization": "Bearer Admin Token",
}
```

```
body:{
    "name": "apartment",
}
```

<br>

#### Expected Responses:

<br>

**Status - 200**

```
body:{
    "message": "Category name updated",

    "data": {
    "id": "string",
    "name": "string",
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

**Status - 400 - Can't edit a field that doesn't exist**

```
body:{
    "status": "Error",
    "code": 403,
    "message": "There's no category associated with this Id"
}
```
