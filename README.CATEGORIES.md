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
    "name":"string"
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
    "id": "string",
    "name": "string",
    }
}
```

<br>

#### Error Responses:

<br>

**Status - 403**

```
body: {
"status": "Error",
"code": 403,
"message": `Category named ${name used in object sent in Request body} already exists`
}
```

<br>

**Status - 401**

```
body: {
"status": "Error",
"code": 401,
"message": "Missing admin token"
}
```

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
    "id": "string",
    "name": "string"
    }
}
```

<br>

#### Error Responses:

<br>

**Status - 400**

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
    "name": "string",
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

**Status - 401**

```
body:{
    "status": "Error",
    "code": 401,
    "message": "Admin token required"
}
```

**Status - 400**

```
body:{
    "status": "Error",
    "code": 403,
    "message": "There's no category associated with this Id"
}
```
