import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";

import {
  mockedUser,
  mockedAdmin,
  mockedUserLogin,
  mockedAdminLogin,
} from "../../mocks/userMocks/index";
import {
  mockedType,
  mockedType2,
  mockedType3,
  mockedTypeTooLarge,
} from "../../mocks/otherMocks";

describe("Testing the type routes", () => {
  let connection: DataSource;
  let genericUser: any;
  let adminUser: any;
  let genericToken: any;
  let adminToken: any;
  let genericType: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    genericUser = await request(app).post("/users").send(mockedUser);
    genericToken = await request(app).post("/login").send(mockedUserLogin);

    adminUser = await request(app).post("/users").send(mockedAdmin);
    adminToken = await request(app).post("/login").send(mockedAdminLogin);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /types - Should be able to create a new type", async () => {
    genericType = await request(app)
      .post("/types")
      .send(mockedType)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(genericType.status).toBe(201);
    expect(genericType.body).toHaveProperty(
      "message",
      "Type created with success"
    );
    expect(genericType.body).toHaveProperty("type");
    expect(genericType.body.type).toHaveProperty("id");
    expect(genericType.body.type).toHaveProperty("name", mockedType.name);
  });

  test("POST /types - Should not be able to create a type without a token", async () => {
    genericType = await request(app).post("/types").send(mockedType2);

    expect(genericType.status).toBe(401);
    expect(genericType.body).toHaveProperty("status", "Error");
    expect(genericType.body).toHaveProperty("code", 401);
    expect(genericType.body).toHaveProperty(
      "message",
      "Missing authorization token"
    );
  });

  test("POST /types - Should not be able to create a type with invalid token", async () => {
    genericType = await request(app)
      .post("/types")
      .send(mockedType3)
      .set("Authorization", `Bearer 1d5d4858-c119-4fff-bfb5-9d5d7`);

    expect(genericType.status).toBe(401);
    expect(genericType.body).toHaveProperty("status", "Error");
    expect(genericType.body).toHaveProperty("code", 401);
    expect(genericType.body).toHaveProperty("message", "Invalid token");
  });

  test("POST /types - Should not be able to create a type without being an Admin", async () => {
    genericType = await request(app)
      .post("/types")
      .send(mockedType2)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(genericType.status).toBe(401);
    expect(genericType.body).toHaveProperty("status", "Error");
    expect(genericType.body).toHaveProperty("code", 401);
    expect(genericType.body).toHaveProperty("message", "User is not an admin");
  });

  test("POST /types - Should not be able to create a type with invalid key values", async () => {
    genericType = await request(app)
      .post("/types")
      .send({ name: 1 })
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(genericType.status).toBe(400);
    expect(genericType.body).toHaveProperty("status", "Error");
    expect(genericType.body).toHaveProperty("code", 400);
    expect(genericType.body).toHaveProperty("message", "name has invalid type");
  });

  test("POST /types - Should not be able to create a type with invalid key length", async () => {
    genericType = await request(app)
      .post("/types")
      .send(mockedTypeTooLarge)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(genericType.status).toBe(413);
    expect(genericType.body).toHaveProperty("status", "Error");
    expect(genericType.body).toHaveProperty("code", 413);
    expect(genericType.body).toHaveProperty("message", "name length too large");
  });

  //

  test("POST /types - Should not be able to create a type that already exists (same name)", async () => {
    genericType = await request(app)
      .post("/types")
      .send(mockedType)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(genericType.status).toBe(409);
    expect(genericType.body).toHaveProperty("status", "Error");
    expect(genericType.body).toHaveProperty("code", 409);
    expect(genericType.body).toHaveProperty(
      "message",
      "This type already exists"
    );
  });

  test("GET /types - Should be able to list types", async () => {
    genericType = await request(app).get("/types");

    expect(genericType.status).toBe(200);
    expect(genericType.body).toHaveProperty("message", "Successful request");
    expect(genericType.body).toHaveProperty("types");
    expect(genericType.body.types.length).toBeGreaterThanOrEqual(1);
    expect(genericType.body.types).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: genericType.body.types[0].id,
          name: mockedType.name,
          isActive: true,
        }),
      ])
    );
  });

  test("GET /types/:id -  Must be able to list one types", async () => {
    genericType = await request(app)
      .post("/types")
      .send(mockedType2)
      .set("Authorization", `Bearer ${adminToken.body.token}`);
    const listOne = await request(app).get(
      `/types/${genericType.body.type.id}`
    );

    expect(listOne.status).toBe(200);
    expect(listOne.body).toHaveProperty("message", "Successful request");
    expect(listOne.body).toHaveProperty("type");
    expect(listOne.body.type).toEqual(
      expect.objectContaining({
        id: genericType.body.type.id,
        name: mockedType2.name,
        isActive: true,
      })
    );
  });

  test("GET /types/:id -  Must not be able to list a type that doesn't exist", async () => {
    const listOne = await request(app).get("/types/this7is7an7invalid7id");

    expect(listOne.status).toBe(404);
    expect(listOne.body).toHaveProperty("status", "Error");
    expect(listOne.body).toHaveProperty("code", 404);
    expect(listOne.body).toHaveProperty("message", "Error");
  });

  test("PATCH /types/:id - Must be able to update a type", async () => {
    const patchOne = await request(app)
      .patch(`/types/${genericType.body.type.id}`)
      .send(mockedType3)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(patchOne.status).toBe(200);
    expect(patchOne.body).toHaveProperty(
      "message",
      "Type updated with success"
    );
    expect(patchOne.body).toHaveProperty("type");
    expect(patchOne.body.type).toHaveProperty("name", mockedType3.name);
  });

  test("PATCH /types/:id - Must not be able to update a type without a token", async () => {
    const patchOne = await request(app)
      .patch(`/types/${genericType.body.type.id}`)
      .send(mockedType3);

    expect(patchOne.status).toBe(401);
    expect(patchOne.body).toHaveProperty("status", "Error");
    expect(patchOne.body).toHaveProperty(
      "message",
      "Missing authorization token"
    );
    expect(patchOne.body).toHaveProperty("code", 401);
  });

  test("PATCH /types/:id - Must not be able to update a type with an invalid token", async () => {
    const patchOne = await request(app)
      .patch(`/types/${genericType.body.type.id}`)
      .send(mockedType3)
      .set("Authorization", `Bearer 1234567890`);

    expect(patchOne.status).toBe(401);
    expect(patchOne.body).toHaveProperty("status", "Error");
    expect(patchOne.body).toHaveProperty("message", "Invalid token");
    expect(patchOne.body).toHaveProperty("code", 401);
  });

  test("PATCH /types/:id - Must not be able to update a type without an Admin token", async () => {
    const patchOne = await request(app)
      .patch(`/types/${genericType.body.type.id}`)
      .send(mockedType3)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(patchOne.status).toBe(401);
    expect(patchOne.body).toHaveProperty("status", "Error");
    expect(patchOne.body).toHaveProperty("message", "User is not an admin");
    expect(patchOne.body).toHaveProperty("code", 401);
  });

  test("PATCH /types/:id - Must not be able to update a type with a key of invalid value", async () => {
    const patchOne = await request(app)
      .patch(`/types/${genericType.body.type.id}`)
      .send({ name: 1 })
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(patchOne.status).toBe(400);
    expect(patchOne.body).toHaveProperty("status", "Error");
    expect(patchOne.body).toHaveProperty("message", "name has invalid type");
    expect(patchOne.body).toHaveProperty("code", 400);
  });

  test("PATCH /types/:id - Must not be able to update a type with a key of invalid value length", async () => {
    const patchOne = await request(app)
      .patch(`/types/${genericType.body.type.id}`)
      .send(mockedTypeTooLarge)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(patchOne.status).toBe(413);
    expect(patchOne.body).toHaveProperty("status", "Error");
    expect(patchOne.body).toHaveProperty("message", "name length too large");
    expect(patchOne.body).toHaveProperty("code", 413);
  });

  test("PATCH /types/:id - Must not be able to update a type that doesn't exist", async () => {
    const patchOne = await request(app)
      .patch(`/types/1d5d4858-c119-4fff-bfb5-9d5d7ea002f2`)
      .send(mockedType)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(patchOne.status).toBe(404);
    expect(patchOne.body).toHaveProperty("code", 404);
    expect(patchOne.body).toHaveProperty("status", "Error");
    expect(patchOne.body).toHaveProperty("message", "Type not found");
  });

  test("PATCH /types/:id - Must not be able to update a type if not making any changes", async () => {
    const patchOne = await request(app)
      .patch(`/types/${genericType.body.type.id}`)
      .send(mockedType3)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(patchOne.status).toBe(400);
    expect(patchOne.body).toHaveProperty("status", "Error");
    expect(patchOne.body).toHaveProperty(
      "message",
      "Not possible to update a type without having any changes in any field"
    );
    expect(patchOne.body).toHaveProperty("code", 400);
  });

  test("DELETE /type/:id - Must be able to soft-delete a type", async () => {
    const deleteOne = await request(app)
      .delete(`/type/${genericType.body.type.id}`)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(deleteOne.status).toBe(200);
    expect(deleteOne.body).toHaveProperty(
      "message",
      "Type deleted with success"
    );
  });

  test("DELETE /types/:id - Must not be able to soft-delete a type without a token", async () => {
    const deleteOne = await request(app).delete(
      `/types/${genericType.body.type.id}`
    );

    expect(deleteOne.status).toBe(401);
    expect(deleteOne.body).toHaveProperty("status", "Error");
    expect(deleteOne.body).toHaveProperty("code", 401);
    expect(deleteOne.body).toHaveProperty(
      "message",
      "Missing authorization token"
    );
  });

  test("DELETE /types/:id - Must not be able to soft-delete a type without a valid token", async () => {
    const deleteOne = await request(app)
      .delete(`/types/${genericType.body.type.id}`)
      .set("Authorization", `Bearer 1234567890`);

    expect(deleteOne.status).toBe(401);
    expect(deleteOne.body).toHaveProperty("code", 401);
    expect(deleteOne.body).toHaveProperty("status", "Error");
    expect(deleteOne.body).toHaveProperty("message", "Invalid token");
  });

  test("DELETE /types/:id - Must not be able to soft-delete a type without being an admin", async () => {
    const deleteOne = await request(app)
      .delete(`/types/${genericType.body.type.id}`)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(deleteOne.status).toBe(401);
    expect(deleteOne.body).toHaveProperty("code", 401);
    expect(deleteOne.body).toHaveProperty("status", "Error");
    expect(deleteOne.body).toHaveProperty("message", "User not admin");
  });

  test("DELETE /types/:id - Must not be able to soft-delete a type that doesn't exists", async () => {
    const deleteOne = await request(app)
      .delete(`/types/this7is7invalid7id`)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(deleteOne.status).toBe(404);
    expect(deleteOne.body).toHaveProperty("code", 404);
    expect(deleteOne.body).toHaveProperty("status", "Error");
    expect(deleteOne.body).toHaveProperty("message", "Type not found");
  });
});
