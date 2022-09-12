# Photos

The Photo object is defined as:

| **Field**       | **Type** | **Description**                   |
| --------------- | -------- | --------------------------------- |
| id              | string   | Photo's unique identifier         |
| files           | file     | Upload user image file            |
| accommodationId | string   | Accommodation's unique identifier |

<br>

### **Endpoints**

| **Method** | **Route**                         | **Description**                                                                                |
| ---------- | --------------------------------- | ---------------------------------------------------------------------------------------------- |
| POST       | /photos/:accommodationId          | Creates a new photo of an accommodation using the accommodation ID as a parameter              |
| GET        | /photos/:accommodationId          | Lists all photos of an accommodation using the accommodation ID as a parameter                 |
| GET        | /photos/:accommodationId/:photoId | Lists a photo of an accommodation using the accommodation ID and photo ID as parameters        |
| DELETE     | /photos/:accommodationId/:photoId | Soft-deletes a photo of an accommodation using the accommodation ID and photo ID as parameters |

<br>

## POST /photos/:accommodationId

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
- User must be the owner of this photo's accommodation or an admin
- Content-type: multipart/form-data

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

<br>

**Request body example**

```multipart/form-data
  files: file.jpg
```

<br>

#### Expected Response:

<br>

**Status 201 - Created**

```json
{
  "message": "Photo created with success",
  "photo": {
    "id": "cfa647b0-5100-4633-ada4-ad17b7f58626",
    "content": "https://res.cloudinary.com/de8wdumps/image/upload/v1662750917/zdlf9ppnkqfjlbxejo8f.jpg",
    "accommodationId": "3ef51e41-efe6-4f0e-908f-190301ff645a"
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

**Status 401 - User is not an admin or the owner of the accommodation**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User must be an admin or the owner of the accommodation"
}
```

<br>

**Status 400 - Missing content field**

```json
{
  "status": "Error",
  "code": 400,
  "message": "content is a required field"
}
```

<br>

**Status 400 - Invalid content type**

```json
{
  "status": "Error",
  "code": 400,
  "message": "content has an invalid type"
}
```

<br>

**Status 404 - Accommodation not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Accommodation not found"
}
```

<br>

**Status 409 - Photo already registered in this accommodation**

```json
{
  "status": "Error",
  "code": 409,
  "message": "Photo already registered in this accommodation"
}
```

<br>

#

## GET /photos/:accommodationId

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: None
- Content-type: application/json
- Empty Body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Successful request",
  "photos": [
    {
      "id": "cfa647b0-5100-4633-ada4-ad17b7f58626",
      "content": "https://res.cloudinary.com/de8wdumps/image/upload/v1662750917/zdlf9ppnkqfjlbxejo8f.jpg",
      "accommodationId": "3ef51e41-efe6-4f0e-908f-190301ff645a"
    },
    ...
  ]
}
```

<br>

#### Error Responses:

<br>

**Status 404 - Accommodation not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Accommodation not found"
}
```

<br>

#

## GET /photos/:accommodationId/:photoId

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: None
- Content-type: application/json
- Empty Body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Successful request",
  "photo": {
    "id": "cfa647b0-5100-4633-ada4-ad17b7f58626",
    "content": "https://res.cloudinary.com/de8wdumps/image/upload/v1662750917/zdlf9ppnkqfjlbxejo8f.jpg",
    "accommodationId": "3ef51e41-efe6-4f0e-908f-190301ff645a"
  }
}
```

<br>

#### Error Responses:

<br>

**Status 404 - Accommodation not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Accommodation not found"
}
```

<br>

**Status 404 - Photo not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Photo not found"
}
```

<br>

#

## DELETE /photos/:accommodationId/:photoId

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
- User must be the owner of this photo's accommodation or an admin
- Content-type: application/json
- Empty Body

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
  "message": "Photo deleted with success"
}
```

<br>

#### Expected Errors:

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

**Status 401 - User is not an admin or the owner of the accommodation**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User must be an admin or the owner of the accommodation"
}
```

<br>

**Status 404 - Accommodation not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Accommodation not found"
}
```

<br>

**Status 404 - Photo not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Photo not found"
}
```

<br>

**Status 400 - Photo already deleted**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Photo already deleted"
}
```

<br>
