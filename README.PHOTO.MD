# Users

The User object is defined as:

| **Field**       | **Type** | **Description**                   |
| --------------- | -------- | --------------------------------- |
| id              | string   | Photo's unique identifier         |
| content         | string   | Photo url provided by cloudinary  |
| accommodationId | string   | Accommodation unique identifier   |

<br>

### **Endpoints**

| **Method** | **Route**       | **Description**                                  |
| ---------- | --------------- | ------------------------------------------------ |
| POST       | /photo          | Creates a new photo                              |
| GET        | /photo          | List all photos                                  |
| GET        | /photo/:photoId | Lists a photo using its ID as a parameter        |
| DELETE     | /photo/:photoId | Soft-deletes a photo using its ID as a parameter |

<br>

## POST /photo

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Accommodation owner token
- Content-type: application/json

<br>

**Request body example**

```json
{
  "content": "https://res.cloudinary.com/de8wdumps/image/upload/v1662750917/zdlf9ppnkqfjlbxejo8f.jpg",
  "accommodationId": "3ef51e41-efe6-4f0e-908f-190301ff645a"
}
```

<br>

#### Expected Response:

<br>

**Status 201 - Created**

```json
{
  "message": "Photo created",
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

**Status  -  **

```json
{
  
}
```


#

## GET /photo

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
- User must be an Adm
- Content-type: application/json
- Empty Body

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
  "message": "Success",
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

#

## GET /photo/:photoId

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
- User must be an Adm or the Owner
- Content-type: application/json
- Empty Body

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
  "message": "Success",
  "photo": 
    {
      "id": "cfa647b0-5100-4633-ada4-ad17b7f58626",
      "content": "https://res.cloudinary.com/de8wdumps/image/upload/v1662750917/zdlf9ppnkqfjlbxejo8f.jpg",
      "accommodationId": "3ef51e41-efe6-4f0e-908f-190301ff645a"
    }
}
```

<br>

#### Error Responses:



#

## PATCH /photo/:photoId

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
- User must be an Adm or the Owner
- Content-type: application/json

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

**Request body example**

```json
{  
  "content": "https://res.cloudinary.com/de8wdumps/image/upload/v1662750917/zdlf9ppnkqfjlbxejo8f.jpg",
  "accommodationId": "3ef51e41-efe6-4f0e-908f-190301ff645a"
}
```

<br>

#### Expected Responses:

<br>

**Status 200 - OK**

```json
{
  "message": "photo updated with success",
  "photo": 
  {
      "id": "cfa647b0-5100-4633-ada4-ad17b7f58626",
      "content": "https://res.cloudinary.com/de8wdumps/image/upload/v1662750917/zdlf9ppnkqfjlbxejo8f.jpg",
      "accommodationId": "3ef51e41-efe6-4f0e-908f-190301ff645a"
  }
}
```

<br>

#### Expected Errors:



#

## DELETE /photo/:photoId

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
- User must be an Adm or the Owner
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


