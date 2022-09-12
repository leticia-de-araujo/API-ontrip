# OnTrip API Documentation

## Content Table

- [OnTrip API Documentation](#ontrip-api-documentation)
  - [Content Table](#content-table)
  - [1. Overview](#1-overview)
    - [1.1. Squad](#11-squad)
  - [2. Entity Relationship Diagram](#2-entity-relationship-diagram)
  - [3. Getting Started](#3-getting-started)
    - [3.1. Installing Dependencies](#31-installing-dependencies)
    - [3.2. Environment Variables](#32-environment-variables)
    - [3.3. Migrations](#33-migrations)
  - [4. Authentication](#4-authentication)
  - [5. Endpoints](#5-endpoints)

---

## 1. Overview

This API was structured with the aim of being the back-end part of the OnTrip app, a front-end project made previously by some of the members of this group.

OnTrip is an accommodation booking platform focused on digital nomads. Therefore, the structure of this API is based on three main CRUD (Create-Read-Update-Delete):

- **Users**
- **Accommodations**
- **Bookings**

Some other routes and entities were needed, due to all the possible data and relationships of these three main entities.

These were the main technologies used in this project:

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Yup](https://www.npmjs.com/package/yup)

**Base URL: http://suaapi.com/v1**

### 1.1. Squad

> - [Letícia de Araújo Nunes](https://www.linkedin.com/in/leticia-de-araujo-nunes/) - TL
> - [André Perregil](https://www.linkedin.com/in/andre-perregil/) - PO
> - [Bruno Passos](https://www.linkedin.com/in/bruno-passosbp/) - SM
> - [André Volcov](https://www.linkedin.com/in/andrevolcov/) - Dev
> - [Hítalo Santos](https://www.linkedin.com/in/hitalosantossilva/) - Dev
> - [Matheus Vieira](https://www.linkedin.com/in/th-matheus/) - Dev

---

## 2. Entity Relationship Diagram

[ Back to the top ](#content-table)

<!-- ![ERD](DER_SP7_01.drawio.png) -->

---

## 3. Getting Started

[ Back to the top ](#content-table)

### 3.1. Installing Dependencies

Clone the project on your machine and install dependencies with the command:

```shell
yarn
```

### 3.2. Environment Variables

Then create a **.env** file, copying the **.env.example** file format:

```shell
cp .env.example .env
```

Set your environment variables with your Postgres credentials and a new database of your choice.

### 3.3. Migrations

Run migrations with the command:

```shell
yarn typeorm migration:run -d src/data-source.ts
```

---

## 4. Authentication

[ Back to the top ](#content-table)

Some routes need authentication. The authentication used is the **Bearer Token** type.

The token is generated automatically at **user login**.

Thus, to access routes with authentication, it is necessary to have a user and be logged in with the user.

In addition, some routes require the user to be an administrator, or owner of the account, or of an accommodation, or the user who made the booking.

Please read each route's documentation to understand which authentications are required.

---

## 5. Endpoints

[ Back to the top ](#content-table)

### Index

- [Users](#1-users)
- [Login](#2-login)
- [Accommodations](#3-accommodations)
- [Bookings](#4-bookings)
- [Address](#5-address)
- [Categories](#6-categories)
- [Capacities](#7-capacities)
- [Types](#8-types)
- [Photos](#9-photos)

---

## 1. **Users**

[ Back to endpoints index ](#index)

The User object is defined as:

| **Field**   | **Type** | **Description**                                   |
| ----------- | -------- | ------------------------------------------------- |
| id          | string   | User's unique identifier                          |
| username    | string   | User name                                         |
| email       | string   | User email                                        |
| password    | string   | User password                                     |
| dateOfBirth | string   | User's date of birth                              |
| isAdm       | boolean  | Defines whether a user is an administrator or not |
| isActive    | boolean  | Defines whether a user is active or not           |
| photo       | string   | Specifies the url of the user's profile image     |

<br>

### **Endpoints**

| **Method** | **Route**      | **Description**                                 |
| ---------- | -------------- | ----------------------------------------------- |
| POST       | /users         | Creates a user                                  |
| GET        | /users         | List all users                                  |
| GET        | /users/:userId | Lists a user using its ID as a parameter        |
| PATCH      | /users/:userId | Updates a user using its ID as a parameter      |
| DELETE     | /users/:userId | Soft-deletes a user using its ID as a parameter |

<br>

#

## POST /users

[ Back to endpoints index ](#index)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: None
- Content-type: application/json

<br>

**Request body example**

```json
{
  "username": "Bob Spencer",
  "email": "bobspencer@email.com",
  "password": "874aS4A6F65i",
  "dateOfBirth": "14/03/1993",
  "photo": "https://res.cloudinary.com/de8wdumps/image/upload/v1662750917/zdlf9ppnkqfjlbxejo8f.jpg"
}
```

<br>

#### Expected Response:

<br>

**Status 201 - Created**

```json
{
  "message": "User created with success",
  "user": {
    "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
    "username": "Bob Spencer",
    "email": "bobspencer@email.com",
    "dateOfBirth": "14/03/1993",
    "photo": "https://res.cloudinary.com/de8wdumps/image/upload/v1662750917/zdlf9ppnkqfjlbxejo8f.jpg",
    "isAdm": false,
    "isActive": true
  }
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

**Status 409 - Email already exists**

```json
{
  "status": "Error",
  "code": 409,
  "message": "This email already exists"
}
```

#

## GET /users

[ Back to endpoints index ](#index)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
- User must be an admin
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
  "message": "Successful request",
  "users": [
    {
      "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
      "username": "Bob Spencer",
      "email": "bobspencer@email.com",
      "dateOfBirth": "14/03/1993",
      "photo": "https://res.cloudinary.com/de8wdumps/image/upload/v1662750917/zdlf9ppnkqfjlbxejo8f.jpg",
      "isAdm": false,
      "isActive": true
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

## GET /users/:userId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
- User must be an admin or the owner of the account
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
  "message": "Successful request",
  "user": {
    "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
    "username": "Bob Spencer",
    "email": "bobspencer@email.com",
    "dateOfBirth": "14/03/1993",
    "photo": "https://res.cloudinary.com/de8wdumps/image/upload/v1662750917/zdlf9ppnkqfjlbxejo8f.jpg",
    "isAdm": false,
    "isActive": true
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

**Status 401 - User is not an admin or the owner of the account**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User must be an admin or the owner of the account"
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

#

## PATCH /users/:userId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
- User must be an admin or the owner of the account
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
  "username?": "Bob Spencer",
  "email?": "bob_spencer@email.com",
  "password?": "874aS4A6F65i",
  "dateOfBirth?": "14/03/1993",
  "*isAdm": false,
  "photo?": "https://res.cloudinary.com/de8wdumps/image/upload/v1662750917/zdlf9ppnkqfjlbxejo8f.jpg"
}
```

- At least one field is required
- Only Adm users can update the isAdm field

<br>

#### Expected Responses:

<br>

**Status 200 - OK**

```json
{
  "message": "User updated with success",
  "user": {
    "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
    "username": "Bob Spencer",
    "email?": "bob_spencer@email.com",
    "dateOfBirth": "14/03/1993",
    "photo": "https://res.cloudinary.com/de8wdumps/image/upload/v1662750917/zdlf9ppnkqfjlbxejo8f.jpg9",
    "isAdm": false,
    "isActive": true
  }
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

**Status 401 - User is not an admin or the owner of the account**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User must be an admin or the owner of the account"
}
```

<br>

**Status 409 - Email already exists**

```json
{
  "status": "Error",
  "code": 409,
  "message": "Email already exists"
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

## DELETE /users/:userId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
- User must be an admin or the owner of the account
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
  "message": "User deleted with success"
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

**Status 401 - User is not an admin or the owner of the account**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User must be an admin or the owner of the account"
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

**Status 400 - User already deleted**

```json
{
  "status": "Error",
  "code": 400,
  "message": "User already deleted"
}
```

<br>

---

## 2. **Login**

[ Back to endpoints index ](#index)

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

#

## POST /login

[ Back to endpoints index ](#index)

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

---

## 3. **Accommodations**

[ Back to endpoints index ](#index)

# Accommodations

The Accommodation object is defined as:

| **Field**     | **Type** | **Description**                                                          |
| ------------- | -------- | ------------------------------------------------------------------------ |
| id            | string   | Accommodation's unique identifier                                        |
| name          | string   | Accommodation name                                                       |
| description   | string   | Accommodation description                                                |
| dailyPrice    | number   | Daily price for accommodation                                            |
| isActive      | boolean  | Defines whether the accommodation is active or not                       |
| verifiedByAdm | boolean  | Defines whether the accommodation is verified by an administrator or not |
| specialOffer  | boolean  | Defines whether the accommodation has a special offer or not             |
| user          | object   | User who owns the accommodation                                          |
| type          | object   | Accommodation type                                                       |
| capacity      | object   | Accommodation capacity                                                   |
| category      | object   | Accommodation category                                                   |

<br>

### **Endpoints**

| **Method** | **Route**                        | **Description**                                           |
| ---------- | -------------------------------- | --------------------------------------------------------- |
| POST       | /accommodations                  | Creates an accommodation                                  |
| GET        | /accommodations                  | Lists all accommodations                                  |
| GET        | /accommodations/:accommodationId | Lists an accommodation using its ID as a parameter        |
| PATCH      | /accommodations/:accommodationId | Updates an accommodation using its ID as a parameter      |
| DELETE     | /accommodations/:accommodationId | Soft-deletes an accommodation using its ID as a parameter |

<br>

#

## POST /accommodations

[ Back to endpoints index ](#index)

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
  "name": "Complete apartment to work",
  "description": "Ideal apartment to work remotely, quiet, comfortable, and with all the requirements for a perfect home office.",
  "dailyPrice": 450,
  "typeId": "6e79c2b7-c479-46e3-aeac-b9f62739799e",
  "userId": "04506439-de18-4700-9175-1876e0ed8c34",
  "capacityId": "0b327321-603d-45a7-b4cd-525c11c14b04",
  "categoryId": "d3b5f8db-a292-46b4-ae69-7821c2789dcd"
}
```

<br>

#### Expected Response:

<br>

**Status 201 - Created**

```json
{
  "message": "Accommodation created with success",
  "accommodation": {
    "id": "90ee8282-af60-4570-9847-fb99d5555355",
    "name": "Complete apartment to work",
    "description": "Ideal apartment to work remotely, quiet, comfortable, and with all the requirements for a perfect home office.",
    "dailyPrice": 450,
    "isActive": true,
    "verifiedByAdm": false,
    "specialOffer": false,
    "type": {
      "name": "A whole place"
    },
    "user": {
      "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
      "username": "Bob Spencer",
      "email": "bobspencer@email.com",
      "dateOfBirth": "14/03/1993",
      "photo": "L2dvYWwgbW9yZJShu54j98vgSD79",
      "isAdm": false,
      "isActive": true
    },
    "capacity": {
      "rooms": 2,
      "beds": 2,
      "totalGuests": 4,
      "bathrooms": 2
    },
    "category": {
      "name": "Apartment"
    }
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

**Status 409 - Accommodation already registered**

```json
{
  "status": "Error",
  "code": 409,
  "message": "This accommodation is already registered"
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

**Status 404 - Type not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Type not found"
}
```

<br>

**Status 404 - Capacity not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Capacity not found"
}
```

<br>

**Status 404 - Category not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Category not found"
}
```

<br>

#

## GET /accommodations

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: None
- Content-type: application/json
- Empty body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Successful request",
  "accommodations": [
    {
      "id": "90ee8282-af60-4570-9847-fb99d5555355",
      "name": "Complete apartment to work",
      "description": "Ideal apartment to work remotely, quiet, comfortable, and with all the requirements for a perfect home office.",
      "dailyPrice": 450,
      "isActive": true,
      "verifiedByAdm": false,
      "specialOffer": false,
      "type": {
        "name": "A whole place"
      },
      "user": {
        "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
        "username": "Bob Spencer",
        "email": "bobspencer@email.com",
        "dateOfBirth": "14/03/1993",
        "photo": "L2dvYWwgbW9yZJShu54j98vgSD79",
        "isAdm": false,
        "isActive": true
      },
      "capacity": {
        "rooms": 2,
        "beds": 2,
        "totalGuests": 4,
        "bathrooms": 2
      },
      "category": {
        "name": "Apartment"
      }
    },
    ...
  ]
}


```

<br>

#### Error Responses:

- No errors expected

#

## GET /accommodations/:accommodationId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: None
- Content-type: application/json
- Empty body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Successful request",
  "accommodation": {
    "id": "90ee8282-af60-4570-9847-fb99d5555355",
    "name": "Complete apartment to work",
    "description": "Ideal apartment to work remotely, quiet, comfortable, and with all the requirements for a perfect home office.",
    "dailyPrice": 450,
    "isActive": true,
    "verifiedByAdm": false,
    "specialOffer": false,
    "type": {
      "name": "A whole place"
    },
    "user": {
      "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
      "username": "Bob Spencer",
      "email": "bobspencer@email.com",
      "dateOfBirth": "14/03/1993",
      "photo": "L2dvYWwgbW9yZJShu54j98vgSD79",
      "isAdm": false,
      "isActive": true
    },
    "capacity": {
      "rooms": 2,
      "beds": 2,
      "totalGuests": 4,
      "bathrooms": 2
    },
    "category": {
      "name": "Apartment"
    }
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

#

## PATCH /accommodations/:accommodationId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: Bearer Token
- User must be the owner of the accommodation or an admin
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
  "name?": "Complete apartment to work",
  "description?": "Ideal apartment to work remotely, quiet, comfortable, and with all the requirements for a perfect home office.",
  "dailyPrice?": 300,
  "specialOffer?": true,
  "*verifiedByAdm?": true,
  "typeId?": "6e79c2b7-c479-46e3-aeac-b9f62739799e",
  "capacityId?": "0b327321-603d-45a7-b4cd-525c11c14b04"
}
```

- At least one field is required
- The field verifiedByAdm can only be updated by an Adm

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Accommodation updated with success",
  "accommodation": {
    "id": "90ee8282-af60-4570-9847-fb99d5555355",
    "name": "Complete apartment to work",
    "description": "Ideal apartment to work remotely, quiet, comfortable, and with all the requirements for a perfect home office.",
    "dailyPrice": 300,
    "isActive": true,
    "verifiedByAdm": false,
    "specialOffer": true,
    "type": {
      "name": "A whole place"
    },
    "user": {
      "id": "f1719800-2e5a-4270-88de-64380f73dd3d",
      "username": "Bob Spencer",
      "email": "bobspencer@email.com",
      "dateOfBirth": "14/03/1993",
      "photo": "L2dvYWwgbW9yZJShu54j98vgSD79",
      "isAdm": false,
      "isActive": true
    },
    "capacity": {
      "rooms": 2,
      "beds": 2,
      "totalGuests": 4,
      "bathrooms": 2
    },
    "category": {
      "name": "Apartment"
    }
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

**Status 400 - No changes in accommodation data**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Not possible to update an accommodation without having any changes in any field"
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

**Status 404 - Type not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Type not found"
}
```

<br>

**Status 404 - Capacity not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Capacity not found"
}
```

<br>

#

## DELETE /accommodations/:accommodationId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Authorization: Bearer Token
- User must be the owner of the accommodation or an admin
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
  "message": "Accommodation deleted with success"
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

**Status 400 - Accommodation already deleted**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Accommodation already deleted"
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

---

## 4. **Bookings**

[ Back to endpoints index ](#index)

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

#

## POST /booking

[ Back to endpoints index ](#index)

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

[ Back to endpoints index ](#index)

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

[ Back to endpoints index ](#index)

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

[ Back to endpoints index ](#index)

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

---

## 5. **Address**

[ Back to endpoints index ](#index)

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
| PATCH      | /address/:addressId | Updates an address using its ID as a parameter |

<br>

#

## POST /address

[ Back to endpoints index ](#index)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
- User must be the owner of the accommodation of the new address or an admin
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

**Status 401 - User is not the owner of the accommodation set at this address or an admin**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User must be the owner of the accommodation set at this address or an admin"
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

**Status 404 - Accommodation not found**

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

#

## PATCH /address/:id

[ Back to endpoints index ](#index)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
- User must be the owner of the accommodation set at this address or an admin
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
  "postalCode?": "29163663",
  "street?": "Rosemberg",
  "complement?": "Quadra 45, Setor Ásia",
  "accommodationId": "661dc120-4851-47ec-8a76-216e8380345e"
}
```

- accommodationId is a required field
- At least one of these fields is required:
  - postalCode
  - street
  - complement

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

**Status 401 - User is not the owner of the accommodation set at this address or an admin**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User must be the owner of the accommodation set at this address or an admin"
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

**Status 400 - No changes in address data**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Not possible to update an address without having any changes in any field"
}
```

<br>

**Status 404 - Address not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Address not found"
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

---

## 6. **Categories**

[ Back to endpoints index ](#index)

# Categories

The Category object is defined as:

| **Field** | **Type** | **Description**                             |
| --------- | -------- | ------------------------------------------- |
| id        | string   | Category's unique identifier                |
| name      | string   | Category name                               |
| isActive  | boolean  | Defines whether a category is active or not |

<br>

### **Endpoints**

| **Method** | **Route**               | **Description**                                     |
| ---------- | ----------------------- | --------------------------------------------------- |
| POST       | /categories             | Creates a category                                  |
| GET        | /categories             | List all categories                                 |
| GET        | /categories/:categoryId | Lists a category using its ID as a parameter        |
| PATCH      | /categories/:categoryId | Updates a category using its ID as a parameter      |
| DELETE     | /categories/:categoryId | Soft-deletes a category using its ID as a parameter |

<br>

#

## POST /categories

[ Back to endpoints index ](#index)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Admin Bearer Token
- User must be an admin to create a category
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
  "name": "Apartment"
}
```

<br>

#### Expected Response:

<br>

**Status 201 - Created**

```json
{
  "message": "Category created with success",
  "category": {
    "id": "fc540668-a80c-4690-8889-1c89c5a51b5c",
    "name": "Apartment",
    "isActive": true
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

**Status 401 - User is not an admin**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User is not an admin"
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

**Status 409 - This category already exists**

```json
{
  "status": "Error",
  "code": 409,
  "message": "This category already exists"
}
```

<br>

#

## GET /categories

[ Back to endpoints index ](#index)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: None
- Content-type: application/json
- Empty body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Successful request",
  "categories":
  [
    {
      "id": "fc540668-a80c-4690-8889-1c89c5a51b5c",
      "name": "Apartment",
      "isActive": true
    },
  ...
  ]
}
```

<br>

#### Error Responses:

- No errors expected

#

## GET /categories/:categoryId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: None
- Content-type: application/json
- Empty body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Successful request",
  "category": {
    "id": "fc540668-a80c-4690-8889-1c89c5a51b5c",
    "name": "Apartment",
    "isActive": true
  }
}
```

<br>

#### Error Responses:

<br>

**Status - 404 - Category not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Category not found"
}
```

<br>

#

## PATCH /categories/:categoryId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Admin Bearer Token
- User must be an admin to update a category
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
  "name": "Studio"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Category updated with success",
  "category": {
    "id": "fc540668-a80c-4690-8889-1c89c5a51b5c",
    "name": "Studio",
    "isActive": true
  }
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

**Status 401 - User is not an admin**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User is not an admin"
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

**Status 404 - Category not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Category not found"
}
```

<br>

**Status 400 - No changes in category data**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Not possible to update a category without having any changes in any field"
}
```

<br>

#

## DELETE /categories/:categoryId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Admin Bearer Token
- User must be an admin to delete a category
- Content-type: application/json
- Empty body

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Category deleted with success"
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

**Status 401 - User is not an admin**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User is not an admin"
}
```

<br>

**Status 404 - Category not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Category not found"
}
```

<br>

**Status 400 - Category already deleted**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Category already deleted"
}
```

<br>

---

## 7. **Capacities**

[ Back to endpoints index ](#index)

# Capacities

The Capacity object is defined as:

| **Field**   | **Type** | **Description**                                |
| ----------- | -------- | ---------------------------------------------- |
| id          | string   | Capacity's unique identifier                   |
| rooms       | number   | Number of capacity rooms                       |
| beds        | number   | Number of capacity beds                        |
| totalGuests | number   | Total number of guests that the capacity hosts |
| bathrooms   | number   | Number of capacity bathrooms                   |
| isActive    | boolean  | Defines whether a capacity is active or not    |

<br>

### **Endpoints**

| **Method** | **Route**               | **Description**                                     |
| ---------- | ----------------------- | --------------------------------------------------- |
| POST       | /capacities             | Creates a capacity                                  |
| GET        | /capacities             | List all capacities                                 |
| GET        | /capacities/:capacityId | Lists a capacity using its ID as a parameter        |
| PATCH      | /capacities/:capacityId | Updates a capacity using its ID as a parameter      |
| DELETE     | /capacities/:capacityId | Soft-deletes a capacity using its ID as a parameter |

<br>

## POST /capacities

[ Back to endpoints index ](#index)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Admin Bearer Token
- User must be an admin to create a capacity
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
  "rooms": 2,
  "beds": 2,
  "totalGuests": 4,
  "bathrooms": 2
}
```

<br>

#### Expected Response:

<br>

**Status 201 - Created**

```json
{
  "message": "Capacity created with success",
  "capacity": {
    "id": "3aa9018f-1415-4caf-a382-07aff5e0076a",
    "rooms": 2,
    "beds": 2,
    "totalGuests": 4,
    "bathrooms": 2,
    "isActive": true
  }
}
```

<br>

#### Error Responses:

<br>

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

**Status 409 - This capacity already exists**

```json
{
  "status": "Error",
  "code": 409,
  "message": "This capacity already exists"
}
```

<br>

#

## GET /capacities

[ Back to endpoints index ](#index)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: None
- Content-type: application/json
- Empty body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Successful request",
  "capacities":
  [
    {
      "id": "3aa9018f-1415-4caf-a382-07aff5e0076a",
      "rooms": 2,
      "beds": 2,
      "totalGuests": 4,
      "bathrooms": 2,
      "isActive": true
    },
  ...
  ]
}
```

<br>

#### Error Responses:

- No errors expected

#

## GET /capacities/:capacityId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: None
- Content-type: application/json
- Empty body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Successful request",
  "capacity": {
    "id": "3aa9018f-1415-4caf-a382-07aff5e0076a",
    "rooms": 2,
    "beds": 2,
    "totalGuests": 4,
    "bathrooms": 2,
    "isActive": true
  }
}
```

<br>

#### Error Responses:

<br>

**Status 404 - Capacity not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Capacity not found"
}
```

<br>

#

## PATCH /capacities/:capacityId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Admin Bearer Token
- User must be an admin to update a capacity
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
  "rooms?": 1,
  "beds?": 1,
  "totalGuests?": 2,
  "bathrooms?": 1
}
```

- At least one field is required

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Capacity updated with success",
  "capacity": {
    "id": "3aa9018f-1415-4caf-a382-07aff5e0076a",
    "rooms": 1,
    "beds": 1,
    "totalGuests": 2,
    "bathrooms": 1,
    "isActive": true
  }
}
```

<br>

#### Expected Errors:

<br>

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

**Status 404 - Capacity not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Capacity not found"
}
```

<br>

**Status 400 - No changes in capacity data**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Not possible to update a capacity without having any changes in any field"
}
```

<br>

#

## DELETE /capacities/:capacityId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Admin Bearer Token
- User must be an admin to delete a capacity
- Content-type: application/json
- Empty body

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Capacity deleted with success"
}
```

<br>

#### Expected Errors:

<br>

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

**Status 404 - Capacity not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Capacity not found"
}
```

<br>

**Status 400 - Capacity already deleted**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Capacity already deleted"
}
```

<br>

---

## 8. **Types**

[ Back to endpoints index ](#index)

# Types

The Type object is defined as:

| **Field** | **Type** | **Description**                         |
| --------- | -------- | --------------------------------------- |
| id        | string   | Type's unique identifier                |
| name      | string   | Type name                               |
| isActive  | boolean  | Defines whether a type is active or not |

<br>

### **Endpoints**

| **Method** | **Route**      | **Description**                                 |
| ---------- | -------------- | ----------------------------------------------- |
| POST       | /types         | Creates a type                                  |
| GET        | /types         | List all types                                  |
| GET        | /types/:typeId | Lists a type using its ID as a parameter        |
| PATCH      | /types/:typeId | Updates a type using its ID as a parameter      |
| DELETE     | /types/:typeId | Soft-deletes a type using its ID as a parameter |

<br>

## POST /types

[ Back to endpoints index ](#index)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Admin Bearer Token
- User must be an admin to create a type
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
  "name": "A whole place"
}
```

<br>

#### Expected Response:

<br>

**Status 201 - Created**

```json
{
  "message": "Type created with success",
  "type": {
    "id": "d57d66cf-3feb-4849-9a86-b8b5654a74af",
    "name": "A whole place",
    "isActive": true
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

**Status 401 - User is not an admin**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User is not an admin"
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

**Status 409 - This type already exists**

```json
{
  "status": "Error",
  "code": 409,
  "message": "This type already exists"
}
```

<br>

#

## GET /types

[ Back to endpoints index ](#index)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: None
- Content-type: application/json
- Empty body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Successful request",
  "types":
  [
    {
      "id": "d57d66cf-3feb-4849-9a86-b8b5654a74af",
      "name": "A whole place",
      "isActive": true
    },
  ...
  ]
}
```

<br>

#### Error Responses:

- No errors expected

#

## GET /types/:typeId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: None
- Content-type: application/json
- Empty body

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Successful request",
  "type": {
    "id": "d57d66cf-3feb-4849-9a86-b8b5654a74af",
    "name": "A whole place",
    "isActive": true
  }
}
```

<br>

#### Error Responses:

<br>

**Status 404 - Type not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Type not found"
}
```

<br>

#

## PATCH /types/:typeId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Admin Bearer Token
- User must be an admin to update a type
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
  "name": "A shared place"
}
```

<br>

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Type updated with success",
  "type": {
    "id": "d57d66cf-3feb-4849-9a86-b8b5654a74af",
    "name": "A shared place",
    "isActive": true
  }
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

**Status 401 - User is not an admin**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User is not an admin"
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

**Status 404 - Type not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Type not found"
}
```

<br>

**Status 400 - No changes in type data**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Not possible to update a type without having any changes in any field"
}
```

<br>

#

## DELETE /types/:typeId

[ Back to endpoints index ](#index)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Admin Bearer Token
- User must be an admin to delete a type
- Content-type: application/json
- Empty body

<br>

**Request headers**

```json
{
  "authorization": "Bearer Token"
}
```

#### Expected Response:

<br>

**Status 200 - OK**

```json
{
  "message": "Type deleted with success"
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

**Status 401 - User is not an admin**

```json
{
  "status": "Error",
  "code": 401,
  "message": "User is not an admin"
}
```

<br>

**Status 404 - Type not found**

```json
{
  "status": "Error",
  "code": 404,
  "message": "Type not found"
}
```

<br>

**Status 400 - Type already deleted**

```json
{
  "status": "Error",
  "code": 400,
  "message": "Type already deleted"
}
```

<br>

---

## 9. **Photos**

[ Back to endpoints index ](#index)

# Photos

The Photo object is defined as:

| **Field**       | **Type** | **Description**                    |
| --------------- | -------- | ---------------------------------- |
| id              | string   | Photo's unique identifier          |
| content         | string   | Photo's url provided by cloudinary |
| accommodationId | string   | Accommodation's unique identifier  |

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

[ Back to endpoints index ](#index)

<br>

#### Request:

- Host: http://suaapi.com/v1
- Authorization: Bearer Token
- User must be the owner of this photo's accommodation or an admin
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
  "content": "https://res.cloudinary.com/de8wdumps/image/upload/v1662750917/zdlf9ppnkqfjlbxejo8f.jpg"
}
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

[ Back to endpoints index ](#index)

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

[ Back to endpoints index ](#index)

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

[ Back to endpoints index ](#index)

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

---
