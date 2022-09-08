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
} from "../../mocks/capacityMocks";

describe("Testing the type routes", () => {
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
    expect(genericCapacity.body.data).toHaveProperty("id");
    expect(genericCapacity.body.data).toHaveProperty("rooms");
    expect(genericCapacity.body.data).toHaveProperty("beds");
    expect(genericCapacity.body.data).toHaveProperty("totalGuests");
    expect(genericCapacity.body.data).toHaveProperty("bathrooms");
  });

  test("POST /capacities - Should not be able to create a capacity that already exists (same values)", async () => {
    genericCapacity = await request(app)
      .post("/capacities")
      .send(mockedCapacity)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(genericCapacity.status).toBe(403);
    expect(genericCapacity.body.data).toHaveProperty("message");
  });

  test("POST /capacities - Should not be able to create a capacity without being an Admin", async () => {
    genericCapacity = await request(app)
      .post("/capacities")
      .send(mockedCapacity2)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(genericCapacity.status).toBe(401);
    expect(genericCapacity.body.data).toHaveProperty("message");
  });

  test("POST /capacities - Should not be able to create a capacity with invalid token", async () => {
    genericCapacity = await request(app)
      .post("/capacities")
      .send(mockedCapacity2)
      .set("Authorization", `Bearer ${adminToken.body.token}67asdtgs67v2g`);

    expect(genericCapacity.status).toBe(401);
    expect(genericCapacity.body.data).toHaveProperty("message");
  });

  test("POST /capacities - Should not be able to create a capacity with invalid data", async () => {
    genericCapacity = await request(app)
      .post("/capacities")
      .send(mockedCapacityInvalid)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(genericCapacity.status).toBe(400);
    expect(genericCapacity.body.data).toHaveProperty("message");
  });

  test("GET /capacities - Should be able to list capacities", async () => {
    genericCapacity = await request(app).get("/capacities");

    expect(genericCapacity.status).toBe(200);
    expect(genericCapacity.body.data).toHaveProperty("message");
    expect(genericCapacity.body.data).toHaveProperty("data");
    expect(genericCapacity.body.data.length).toBeGreaterThanOrEqual(1);
    expect(genericCapacity.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: genericCapacity.body.data[0].id,
          rooms: mockedCapacity.rooms,
          beds: mockedCapacity.beds,
          totalGuests: mockedCapacity.totalGuests,
          bathrooms: mockedCapacity.bathrooms,
        }),
      ])
    );
  });

  test("GET /capacities/:id -  Should be able to list one capacity", async () => {
    genericCapacity = await request(app)
      .post("/capacities")
      .send(mockedCapacity2)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    const listOne = await request(app)
      .get(
        `/capacities/${
          genericCapacity.body.data[genericCapacity.body.data.length - 1].id
        }`
      )
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(listOne.status).toBe(200);
    expect(listOne.body.data).toHaveProperty("message");
    expect(listOne.body.data).toHaveProperty("data");
    expect(listOne.body.data).toEqual(
      expect.objectContaining({
        id: genericCapacity.body.data[0].id,
        rooms: mockedCapacity2.rooms,
        beds: mockedCapacity2.beds,
        totalGuests: mockedCapacity2.totalGuests,
        bathrooms: mockedCapacity2.bathrooms,
      })
    );
  });

  test("GET /capacities/:id -  Should not be able to list a capacity that doesn't exist", async () => {
    const listOne = await request(app)
      .get("/capacities/this7is7an7invalid7id")
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(listOne.status).toBe(400);
    expect(listOne.body.data).toHaveProperty("message");
    expect(listOne.body.data).toMatchObject({
      message: "Capacity not found",
    });
  });

  test("PATCH /capacities/:id - Should be able to update a capacity", async () => {
    const patchOne = await request(app)
      .patch(`/capacities/${genericCapacity.body.data.id}`)
      .send(mockedCapacity3)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(patchOne.status).toBe(200);
    expect(patchOne.body.data).toHaveProperty("message");
    expect(patchOne.body.data).toHaveProperty("data");
    expect(patchOne.body.data).toEqual(
      expect.objectContaining({
        id: genericCapacity.body.data[0].id,
        rooms: mockedCapacity3.rooms,
        beds: mockedCapacity3.beds,
        totalGuests: mockedCapacity3.totalGuests,
        bathrooms: mockedCapacity3.bathrooms,
      })
    );
  });

  test("PATCH /capacities/:id - Should not be able to update a capacity without being an admin", async () => {
    const patchOne = await request(app)
      .patch(`/capacities/${genericCapacity.body.data.id}`)
      .send(mockedCapacity2)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(patchOne.status).toBe(401);
    expect(patchOne.body.data).toHaveProperty("message");
    expect(patchOne.body.data).toStrictEqual({
      message: "Missing admin token",
    });
  });

  test("PATCH /capacities/:id - Should not be able to update a capacity that doesn't exist", async () => {
    const patchOne = await request(app)
      .patch(`/capacities/this7is7an7invalid7token`)
      .send(mockedCapacity)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(patchOne.status).toBe(400);
    expect(patchOne.body.data).toHaveProperty("message");
    expect(patchOne.body.data).toStrictEqual({
      message: "Capacity not found",
    });
  });

  test("PATCH /capacities/:id - Should not be able to update a capacity with invalid data", async () => {
    const patchOne = await request(app)
      .patch(`/capacities/${genericCapacity.body.data.id}`)
      .send(mockedCapacityInvalidPatch)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(patchOne.status).toBe(400);
    expect(patchOne.body.data).toHaveProperty("message");
    expect(patchOne.body.data).toStrictEqual({
      message:
        "Invalid capacity data (negative values or unreasonable guest capacity)",
    });
  });

  test("PATCH /capacities/:id - Should not be able to update a capacity with the same data", async () => {
    const patchOne = await request(app)
      .patch(`/capacities/${genericCapacity.body.data.id}`)
      .send(mockedCapacity)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(patchOne.status).toBe(400);
    expect(patchOne.body.data).toHaveProperty("message");
    expect(patchOne.body.data).toStrictEqual({
      message:
        "Not possible to update a capacity without having any changes in any field",
    });
  });

  // delete tests ?
});
