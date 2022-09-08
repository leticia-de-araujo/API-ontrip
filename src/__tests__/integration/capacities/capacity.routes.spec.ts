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

  test("GET /capacities/:id -  Must be able to list one capacity", async () => {
    genericCapacity = await request(app)
      .post("/capacities")
      .send(mockedCapacity2);
    const listOne = await request(app).get(
      `/capacities/${
        genericCapacity.body.data[genericCapacity.body.data.length - 1].id
      }`
    );

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

  test("GET /capacities/:id -  Must not be able to list a capacity that doesn't exist", async () => {
    const listOne = await request(app).get("/capacities/this7is7an7invalid7id");

    expect(listOne.status).toBe(400);
    expect(listOne.body.data).toHaveProperty("message");
    expect(listOne.body.data).toMatchObject({
      message: "There's no capacity associated with this ID",
    });
  });

  test("PATCH /capacities/:id - Must be able to update a capacity", async () => {
    const patchOne = await request(app)
      .post(`/capacities/${genericCapacity.body.data.id}`)
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

  test("PATCH /capacities/:id - Must not be able to update a capacity without being and admin", async () => {
    const patchOne = await request(app)
      .post(`/capacities/${genericCapacity.body.data.id}`)
      .send(mockedCapacity2)
      .set("Authorization", `Bearer ${genericToken.body.token}`);

    expect(patchOne.status).toBe(401);
    expect(patchOne.body.data).toHaveProperty("message");
    expect(patchOne.body.data).toStrictEqual({
      message: "Not authorized to update a capacity not being admin",
    });
  });

  test("PATCH /capacities/:id - Must not be able to update a capacity that doesn't exist", async () => {
    const patchOne = await request(app)
      .post(`/capacities/this7is7an7invalid7token`)
      .send(mockedCapacity)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(patchOne.status).toBe(400);
    expect(patchOne.body.data).toHaveProperty("message");
    expect(patchOne.body.data).toStrictEqual({
      message: "There's no capacity associated with this ID",
    });
  });

  test("PATCH /capacities/:id - Must not be able to update a capacity with invalid data", async () => {
    const patchOne = await request(app)
      .post(`/capacities/${genericCapacity.body.data.id}`)
      .send(mockedCapacityInvalidPatch)
      .set("Authorization", `Bearer ${adminToken.body.token}`);

    expect(patchOne.status).toBe(400);
    expect(patchOne.body.data).toHaveProperty("message");
    expect(patchOne.body.data).toStrictEqual({
      message:
        "The changes to a capacity need to make sense (no negative values, at least able to host 1 guest)",
    });
  });
});
