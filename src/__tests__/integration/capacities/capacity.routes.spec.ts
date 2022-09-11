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
  mockedCapacity,
  mockedCapacity2,
  mockedCapacity3,
  mockedCapacityInvalid,
  mockedCapacityInvalidPatch,
  mockedCapacityPatch,
} from "../../mocks/capacityMocks";

describe("Testing the capacities routes", () => {
  let connection: DataSource;
  let genericUser: any;
  let adminUser: any;
  let genericToken: any;
  let adminToken: any;
  let genericCapacity: any;

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

  test("POST /capacities - Should be able to create a new capacity", async () => {
    genericCapacity = await request(app)
      .post("/capacities")
      .send(mockedCapacity)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(genericCapacity.status).toBe(201);
    expect(genericCapacity.body).toHaveProperty(
      "message",
      "Capacity created with success"
    );
    expect(genericCapacity.body).toHaveProperty(
      "message",
      "Capacity created with success"
    );
    expect(genericCapacity.body.capacity).toHaveProperty("id");
    expect(genericCapacity.body.capacity).toHaveProperty("rooms", 1);
    expect(genericCapacity.body.capacity).toHaveProperty("beds", 1);
    expect(genericCapacity.body.capacity).toHaveProperty("totalGuests", 2);
    expect(genericCapacity.body.capacity).toHaveProperty("bathrooms", 1);
    expect(genericCapacity.body.capacity).toHaveProperty("isActive", true);
  });

  test("POST /capacities - Should not be able to create a new capacity without a token", async () => {
    genericCapacity = await request(app)
      .post("/capacities")
      .send(mockedCapacity2);

    expect(genericCapacity.status).toBe(401);
    expect(genericCapacity.body.capacity).toHaveProperty("code", 401);
    expect(genericCapacity.body).toHaveProperty(
      "message",
      "Missing authorization token"
    );
  });

  test("POST /capacities - Should not be able to create a new capacity with invalid token", async () => {
    genericCapacity = await request(app)
      .post("/capacities")
      .send(mockedCapacity2)
      .set("Authorization", `Bearer 1d5d4858-c119-4fff-bfb5-9d5d7`);

    expect(genericCapacity.status).toBe(401);
    expect(genericCapacity.body).toHaveProperty("code", 401);
    expect(genericCapacity.body).toHaveProperty("message", "Invalid token");
  });

  test("POST /capacities - Should not be able to create a capacity without being an Admin", async () => {
    genericCapacity = await request(app)
      .post("/capacities")
      .send(mockedCapacity2)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(genericCapacity.status).toBe(401);
    expect(genericCapacity.body).toHaveProperty("code", 401);
    expect(genericCapacity.body).toHaveProperty(
      "message",
      "User is not an admin"
    );
  });

  test("POST /capacities - Should not be able to create a capacity without required data", async () => {
    genericCapacity = await request(app)
      .post("/capacities")
      .send(mockedCapacityPatch)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(genericCapacity.status).toBe(400);
    expect(genericCapacity.body).toHaveProperty("code", 400);
    expect(genericCapacity.body).toHaveProperty(
      "message",
      "rooms is a required field"
    );
  });

  test("POST /capacities - Should not be able to create a capacity with invalid data", async () => {
    genericCapacity = await request(app)
      .post("/capacities")
      .send(mockedCapacityInvalid)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(genericCapacity.status).toBe(400);
    expect(genericCapacity.body).toHaveProperty("code", 400);
    expect(genericCapacity.body).toHaveProperty(
      "message",
      "rooms has an invalid type"
    );
  });

  /// Missing 413 - data length too large(discuss maximum number for key values)

  test("POST /capacities - Should not be able to create a capacity that already exists (same values)", async () => {
    genericCapacity = await request(app)
      .post("/capacities")
      .send(mockedCapacity)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(genericCapacity.status).toBe(409);
    expect(genericCapacity.body).toHaveProperty("code", 409);
    expect(genericCapacity.body).toHaveProperty(
      "message",
      "This capacity already exists"
    );
  });

  test("GET /capacities - Should be able to list capacities", async () => {
    genericCapacity = await request(app).get("/capacities");

    expect(genericCapacity.status).toBe(200);
    expect(genericCapacity.body).toHaveProperty("message", "Successful request");
    expect(genericCapacity.body).toHaveProperty("capacities");
    expect(genericCapacity.body.capacities[0]).toStrictEqual({
      id: genericCapacity.body.capacities[0].id,
      rooms: mockedCapacity.rooms,
      beds: mockedCapacity.beds,
      totalGuests: mockedCapacity.totalGuests,
      bathrooms: mockedCapacity.bathrooms,
      isActive: true,
    });
  });

  test("GET /capacities/:id -  Should be able to list one capacity", async () => {
    genericCapacity = await request(app).get(
      `/capacities/${genericCapacity.body.capacities[0].id}`
    );

    expect(genericCapacity.status).toBe(200);
    expect(genericCapacity.body).toHaveProperty("message", "Successful request");
    expect(genericCapacity.body).toHaveProperty("capacity");
    expect(genericCapacity.body.capacity).toStrictEqual({
      id: genericCapacity.body.capacity.id,
      rooms: mockedCapacity.rooms,
      beds: mockedCapacity.beds,
      totalGuests: mockedCapacity.totalGuests,
      bathrooms: mockedCapacity.bathrooms,
      isActive: true,
    });
  });

  test("GET /capacities/:id -  Should not be able to list a capacity that doesn't exist", async () => {
    const listOne = await request(app).get(
      "/capacities/1d5d4858-c119-4fff-bfb5-9d5d7"
    );

    expect(listOne.status).toBe(404);
    expect(listOne.body).toHaveProperty("code", 404);
    expect(listOne.body).toHaveProperty("status", "Error");
    expect(listOne.body).toHaveProperty("message", "Capacity not found");
  });

  test("PATCH /capacities/:id - Should be able to update a capacity", async () => {
    const patchOne = await request(app)
      .patch(`/capacities/${genericCapacity.body.capacity.id}`)
      .send(mockedCapacity3)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(patchOne.status).toBe(200);
    expect(patchOne.body).toHaveProperty(
      "message",
      "Capacity updated with success"
    );
    expect(patchOne.body).toHaveProperty("capacity");
    expect(patchOne.body.capacity).toStrictEqual({
      id: patchOne.body.capacity.id,
      rooms: mockedCapacity3.rooms,
      beds: mockedCapacity3.beds,
      totalGuests: mockedCapacity3.totalGuests,
      bathrooms: mockedCapacity3.bathrooms,
      isActive: true,
    });
  });

  test("PATCH /capacities/:id - Should not be able to update a capacity without authorization token", async () => {
    const patchOne = await request(app)
      .patch(`/capacities/${genericCapacity.body.capacity.id}`)
      .send(mockedCapacity2);

    expect(patchOne.status).toBe(401);
    expect(patchOne.body).toHaveProperty("code", 401);
    expect(patchOne.body).toHaveProperty("status", "Error");
    expect(patchOne.body).toHaveProperty(
      "message",
      "Missing authorization token"
    );
  });

  test("PATCH /capacities/:id - Should not be able to update a capacity with invalid token", async () => {
    const patchOne = await request(app)
      .patch(`/capacities/${genericCapacity.body.capacity.id}`)
      .send(mockedCapacity2)
      .set("Authorization", `Bearer 1d5d4858-c119-4fff-bfb5-9d5d7`);

    expect(patchOne.status).toBe(401);
    expect(patchOne.body).toHaveProperty("code", 401);
    expect(patchOne.body).toHaveProperty("status", "Error");
    expect(patchOne.body).toHaveProperty("message", "Invalid token");
  });

  test("PATCH /capacities/:id - Should not be able to update a capacity without being an admin", async () => {
    const patchOne = await request(app)
      .patch(`/capacities/${genericCapacity.body.capacity.id}`)
      .send(mockedCapacity2)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(patchOne.status).toBe(401);
    expect(patchOne.body).toHaveProperty("code", 401);
    expect(patchOne.body).toHaveProperty("status", "Error");
    expect(patchOne.body).toHaveProperty("message", "User is not an admin");
  });

  test("PATCH /capacities/:id - Should not be able to update a capacity with invalid data", async () => {
    const patchOne = await request(app)
      .patch(`/capacities/${genericCapacity.body.capacity.id}`)
      .send(mockedCapacityInvalidPatch)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(patchOne.status).toBe(400);
    expect(patchOne.body).toHaveProperty("code", 400);
    expect(patchOne.body).toHaveProperty("status", "Error");
    expect(patchOne.body).toHaveProperty(
      "message",
      "totalGuests has invalid type"
    );
  });

  /// missing test -413 - disccuss maximum values for each key

  test("PATCH /capacities/:id - Should not be able to update a capacity that doesn't exist", async () => {
    const patchOne = await request(app)
      .patch(`/capacities/1d5d4858-c119-4fff-bfb5-9d5d7`)
      .send(mockedCapacity)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(patchOne.status).toBe(400);
    expect(patchOne.body).toHaveProperty("code", 400);
    expect(patchOne.body).toHaveProperty("status", "Error");
    expect(patchOne.body).toHaveProperty("message", "Capacity not found");
  });

  test("PATCH /capacities/:id - Should not be able to update a capacity with the same data", async () => {
    const patchOne = await request(app)
      .patch(`/capacities/${genericCapacity.body.capacity.id}`)
      .send(mockedCapacity)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(patchOne.status).toBe(400);
    expect(patchOne.body).toHaveProperty("code", 400);
    expect(patchOne.body).toHaveProperty("status", "Error");
    expect(patchOne.body).toHaveProperty(
      "message",
      "Not possible to update a capacity without having any changes in any field"
    );
  });

  test("DELETE /capacities/:id - Should be able to soft-delete a capacity", async () => {
    const deleteOne = await request(app)
      .delete(`/capacities/${genericCapacity.body.capacity.id}`)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(deleteOne.status).toBe(200);
    expect(deleteOne.body).toHaveProperty(
      "message",
      "Capacity deleted with success"
    );
  });

  test("DELETE /capacities/:id - Should not be able to soft-delete a capacity without a token", async () => {
    const deleteOne = await request(app).delete(
      `/capacities/${genericCapacity.body.capacity.id}`
    );

    expect(deleteOne.status).toBe(401);
    expect(deleteOne.body).toHaveProperty("status", "Error");
    expect(deleteOne.body).toHaveProperty("code", 401);
    expect(deleteOne.body).toHaveProperty(
      "message",
      "Missing authorization token"
    );
  });

  test("DELETE /capacities/:id - Should not be able to soft-delete a capacity with an invalid token", async () => {
    const deleteOne = await request(app)
      .delete(`/capacities/${genericCapacity.body.capacity.id}`)
      .set("Authorization", `Bearer $1d5d4858-c119-4fff-bfb5-9d5d7`);

    expect(deleteOne.status).toBe(401);
    expect(deleteOne.body).toHaveProperty("status", "Error");
    expect(deleteOne.body).toHaveProperty("code", 401);
    expect(deleteOne.body).toHaveProperty("message", "Invalid token");
  });

  test("DELETE /capacities/:id - Should not be able to soft-delete a capacity without an admin token", async () => {
    const deleteOne = await request(app)
      .delete(`/capacities/${genericCapacity.body.capacity.id}`)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(deleteOne.status).toBe(401);
    expect(deleteOne.body).toHaveProperty("status", "Error");
    expect(deleteOne.body).toHaveProperty("code", 401);
    expect(deleteOne.body).toHaveProperty("message", "User is not an admin");
  });

  test("DELETE /capacities/:id - Should not be able to soft-delete a capacity that doesn't exist", async () => {
    const deleteOne = await request(app)
      .delete(`/capacities/1d5d4858-c119-4fff-bfb5-9d5d7`)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(deleteOne.status).toBe(404);
    expect(deleteOne.body).toHaveProperty("status", "Error");
    expect(deleteOne.body).toHaveProperty("code", 404);
    expect(deleteOne.body).toHaveProperty("message", "Capacity not found");
  });
});
